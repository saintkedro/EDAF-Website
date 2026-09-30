"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { eventSeries } from "@/lib/content";
import { EVENTS_TAG } from "@/lib/events";
import { MEDIA_BUCKET } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { parseVideoUrl } from "@/lib/video";

export type FormState = { error?: string; message?: string };

function refreshPublicPages() {
  updateTag(EVENTS_TAG);
  revalidatePath("/events", "layout");
  revalidatePath("/gallery");
  revalidatePath("/");
}

function text(formData: FormData, name: string, max: number) {
  const value = String(formData.get(name) ?? "").trim();
  if (value.length > max) throw new Error(`"${name.replace("_", " ")}" is too long (maximum ${max} characters).`);
  return value || null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function message(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveEvent(_prev: FormState, formData: FormData): Promise<FormState> {
  let createdId: string | null = null;
  try {
    const supabase = await requireAdmin();
    const id = String(formData.get("id") ?? "") || null;
    const series = String(formData.get("series") ?? "");
    const seriesInfo = eventSeries.find((s) => s.slug === series);
    if (!seriesInfo) return { error: "Choose which annual event this is." };

    const startsOn = String(formData.get("starts_on") ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startsOn)) return { error: "Enter the event date." };

    const title = text(formData, "title", 200) ?? `${startsOn.slice(0, 4)} ${seriesInfo.title}`;

    const slug = slugify(String(formData.get("slug") ?? "")) || startsOn.slice(0, 4);

    const record = {
      series,
      slug,
      title,
      starts_on: startsOn,
      start_time: text(formData, "start_time", 40),
      venue: text(formData, "venue", 300),
      theme: text(formData, "theme", 300),
      speaker: text(formData, "speaker", 300),
      summary: text(formData, "summary", 600),
      body: text(formData, "body", 20000),
      published: formData.get("published") === "on",
    };

    const { data, error } = id
      ? await supabase.from("events").update(record).eq("id", id).select("id").single()
      : await supabase.from("events").insert(record).select("id").single();

    if (error) {
      if (error.code === "23505") {
        return { error: `There is already a ${series === "public-lecture" ? "lecture" : "carol"} with the web address "${slug}". Change the web address.` };
      }
      return { error: error.message };
    }

    refreshPublicPages();
    if (id) return { message: record.published ? "Saved and published." : "Saved as a draft." };
    createdId = data.id;
  } catch (error) {
    return { error: message(error) };
  }
  redirect(`/admin/events/${createdId}`);
}

export async function deleteEvent(id: string) {
  const supabase = await requireAdmin();
  const { data: files } = await supabase.from("media").select("storage_path").eq("event_id", id).not("storage_path", "is", null);
  const paths = (files ?? []).map((f) => f.storage_path as string);
  if (paths.length) await supabase.storage.from(MEDIA_BUCKET).remove(paths);

  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refreshPublicPages();
  redirect("/admin");
}

export type WinnerInput = { position: number; choir: string; denomination: string; prize: string };

export async function saveWinners(eventId: string, winners: WinnerInput[]): Promise<FormState> {
  try {
    const supabase = await requireAdmin();
    const rows = winners
      .map((w) => ({
        event_id: eventId,
        position: Math.trunc(Number(w.position)),
        choir: w.choir.trim(),
        denomination: w.denomination.trim() || null,
        prize: w.prize.trim() || null,
      }))
      .filter((w) => w.choir);
    if (rows.some((w) => !(w.position >= 1 && w.position <= 50))) return { error: "Positions must be between 1 and 50." };

    const { error: deleteError } = await supabase.from("event_winners").delete().eq("event_id", eventId);
    if (deleteError) return { error: deleteError.message };
    if (rows.length) {
      const { error } = await supabase.from("event_winners").insert(rows);
      if (error) return { error: error.message };
    }
    refreshPublicPages();
    return { message: "Winners saved." };
  } catch (error) {
    return { error: message(error) };
  }
}

export type UploadedFile = {
  kind: "photo" | "document";
  storage_path: string;
  caption: string | null;
  width: number | null;
  height: number | null;
};

export async function addUploadedMedia(eventId: string | null, files: UploadedFile[]): Promise<FormState> {
  try {
    const supabase = await requireAdmin();
    const prefix = eventId ? `events/${eventId}/` : "gallery/";
    if (files.some((f) => !f.storage_path.startsWith(prefix))) return { error: "Unexpected file location." };
    const { error } = await supabase.from("media").insert(files.map((f) => ({ ...f, event_id: eventId })));
    if (error) {
      await supabase.storage.from(MEDIA_BUCKET).remove(files.map((f) => f.storage_path));
      return { error: error.message };
    }
    refreshPublicPages();
    return { message: files.length === 1 ? "File added." : `${files.length} files added.` };
  } catch (error) {
    return { error: message(error) };
  }
}

export async function addVideo(eventId: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const supabase = await requireAdmin();
    const url = String(formData.get("video_url") ?? "").trim();
    if (!parseVideoUrl(url)) return { error: "Paste a YouTube or Facebook video link." };
    const caption = text(formData, "caption", 300);
    const { error } = await supabase.from("media").insert({ event_id: eventId, kind: "video", video_url: url, caption });
    if (error) return { error: error.message };
    refreshPublicPages();
    return { message: "Video added." };
  } catch (error) {
    return { error: message(error) };
  }
}

export async function updateCaption(mediaId: string, caption: string): Promise<FormState> {
  try {
    const supabase = await requireAdmin();
    const value = caption.trim().slice(0, 300) || null;
    const { error } = await supabase.from("media").update({ caption: value }).eq("id", mediaId);
    if (error) return { error: error.message };
    refreshPublicPages();
    return { message: "Caption saved." };
  } catch (error) {
    return { error: message(error) };
  }
}

export async function deleteMedia(mediaId: string): Promise<FormState> {
  try {
    const supabase = await requireAdmin();
    const { data: item, error } = await supabase
      .from("media")
      .delete()
      .eq("id", mediaId)
      .select("event_id, storage_path")
      .single();
    if (error) return { error: error.message };
    if (item.storage_path) {
      await supabase.storage.from(MEDIA_BUCKET).remove([item.storage_path]);
      if (item.event_id) {
        await supabase.from("events").update({ cover_path: null }).eq("id", item.event_id).eq("cover_path", item.storage_path);
      }
    }
    refreshPublicPages();
    return { message: "Removed." };
  } catch (error) {
    return { error: message(error) };
  }
}

export async function setCover(eventId: string, storagePath: string | null): Promise<FormState> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("events").update({ cover_path: storagePath }).eq("id", eventId);
    if (error) return { error: error.message };
    refreshPublicPages();
    return { message: storagePath ? "Cover photo set." : "Cover photo removed." };
  } catch (error) {
    return { error: message(error) };
  }
}
