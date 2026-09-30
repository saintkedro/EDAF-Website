"use client";

import Image from "next/image";
import { useActionState, useState, useTransition } from "react";
import {
  addUploadedMedia,
  addVideo,
  deleteMedia,
  setCover,
  updateCaption,
  type FormState,
  type UploadedFile,
} from "@/app/admin/actions";
import { hintClass, inputClass, labelClass, primaryButton, secondaryButton } from "@/components/admin/styles";
import type { MediaItem } from "@/lib/event-utils";
import { createClient } from "@/lib/supabase/browser";
import { MEDIA_BUCKET, mediaUrl } from "@/lib/supabase/config";
import { parseVideoUrl } from "@/lib/video";

const MAX_DIMENSION = 2000;
const MAX_PDF_BYTES = 20 * 1024 * 1024;

async function resizeImage(file: File) {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) throw new Error("Could not process the image.");
  return { blob, width, height };
}

export default function MediaManager({
  eventId,
  items,
  coverPath,
}: {
  eventId: string | null;
  items: MediaItem[];
  coverPath?: string | null;
}) {
  const prefix = eventId ? `events/${eventId}/` : "gallery/";
  const [status, setStatus] = useState<FormState & { progress?: string }>({});
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  const [videoState, videoAction, videoPending] = useActionState<FormState, FormData>(addVideo.bind(null, eventId), {});

  const photos = items.filter((i) => i.kind === "photo");
  const videos = items.filter((i) => i.kind === "video");
  const documents = items.filter((i) => i.kind === "document");

  async function upload(files: File[], kind: UploadedFile["kind"]) {
    if (!files.length) return;
    setUploading(true);
    const storage = createClient().storage.from(MEDIA_BUCKET);
    const uploaded: UploadedFile[] = [];
    const failed: string[] = [];

    for (const [i, file] of files.entries()) {
      setStatus({ progress: `Uploading ${i + 1} of ${files.length}…` });
      try {
        let body: Blob = file;
        let width: number | null = null;
        let height: number | null = null;
        let extension = "pdf";
        if (kind === "photo") {
          ({ blob: body, width, height } = await resizeImage(file));
          extension = "jpg";
        } else if (file.type !== "application/pdf" || file.size > MAX_PDF_BYTES) {
          throw new Error("Only PDF files up to 20 MB can be uploaded.");
        }
        const path = `${prefix}${crypto.randomUUID()}.${extension}`;
        const { error } = await storage.upload(path, body, {
          contentType: kind === "photo" ? "image/jpeg" : "application/pdf",
          cacheControl: "31536000",
        });
        if (error) throw error;
        const caption = kind === "document" ? file.name.replace(/\.pdf$/i, "") : null;
        uploaded.push({ kind, storage_path: path, caption, width, height });
      } catch (error) {
        failed.push(`${file.name}: ${error instanceof Error ? error.message : "upload failed"}`);
      }
    }

    const result = uploaded.length ? await addUploadedMedia(eventId, uploaded) : {};
    setStatus({
      message: result.message,
      error: [result.error, ...failed].filter(Boolean).join(" · ") || undefined,
    });
    setUploading(false);
  }

  function run(action: () => Promise<FormState>) {
    startTransition(async () => setStatus(await action()));
  }

  function remove(item: MediaItem) {
    if (window.confirm("Remove this item? This cannot be undone.")) run(() => deleteMedia(item.id));
  }

  const busy = uploading || pending;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
        <h2 className="font-semibold tracking-tight text-xl text-navy-900">Add photos and documents</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor={`photos-${eventId ?? "gallery"}`}>
              Photos
            </label>
            <input
              id={`photos-${eventId ?? "gallery"}`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={busy}
              onChange={(e) => {
                upload(Array.from(e.target.files ?? []), "photo");
                e.target.value = "";
              }}
              className="mt-2 block w-full text-sm file:mr-4 file:min-h-11 file:rounded-full file:border-0 file:bg-navy-800 file:px-5 file:font-semibold file:text-white hover:file:bg-navy-700"
            />
            <p className={hintClass}>Select several at once. Large photos are resized automatically.</p>
          </div>
          <div>
            <label className={labelClass} htmlFor={`docs-${eventId ?? "gallery"}`}>
              Documents (PDF)
            </label>
            <input
              id={`docs-${eventId ?? "gallery"}`}
              type="file"
              accept="application/pdf"
              multiple
              disabled={busy}
              onChange={(e) => {
                upload(Array.from(e.target.files ?? []), "document");
                e.target.value = "";
              }}
              className="mt-2 block w-full text-sm file:mr-4 file:min-h-11 file:rounded-full file:border-0 file:bg-navy-800 file:px-5 file:font-semibold file:text-white hover:file:bg-navy-700"
            />
            <p className={hintClass}>Programmes, lecture papers or press releases, up to 20 MB each.</p>
          </div>
        </div>
        <div className="mt-4 min-h-5 text-sm font-medium" aria-live="polite">
          {status.progress && uploading && <p className="text-navy-800">{status.progress}</p>}
          {!uploading && status.error && <p className="text-red-700">{status.error}</p>}
          {!uploading && status.message && <p className="text-leaf-700">{status.message}</p>}
        </div>
      </div>

      <form action={videoAction} className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
        <h2 className="font-semibold tracking-tight text-xl text-navy-900">Add a video</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
          <div>
            <label htmlFor={`video-${eventId ?? "gallery"}`} className={labelClass}>
              YouTube or Facebook link
            </label>
            <input
              id={`video-${eventId ?? "gallery"}`}
              name="video_url"
              type="url"
              required
              placeholder="https://www.youtube.com/watch?v=…"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`video-caption-${eventId ?? "gallery"}`} className={labelClass}>
              Caption
            </label>
            <input id={`video-caption-${eventId ?? "gallery"}`} name="caption" maxLength={300} className={inputClass} />
          </div>
          <button type="submit" disabled={videoPending} className={primaryButton}>
            {videoPending ? "Adding…" : "Add video"}
          </button>
        </div>
        {videoState.error && <p role="alert" className="mt-3 text-sm font-medium text-red-700">{videoState.error}</p>}
        {videoState.message && <p role="status" className="mt-3 text-sm font-medium text-leaf-700">{videoState.message}</p>}
      </form>

      <section className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
        <h2 className="font-semibold tracking-tight text-xl text-navy-900">Photos ({photos.length})</h2>
        {photos.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No photos yet.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => {
              const isCover = Boolean(eventId && photo.storage_path === coverPath);
              return (
                <li key={photo.id} className="overflow-hidden rounded-xl border border-navy-900/10">
                  <div className="relative aspect-[4/3] bg-navy-50">
                    <Image src={mediaUrl(photo.storage_path!)} alt={photo.caption ?? ""} fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
                    {isCover && (
                      <span className="absolute left-2 top-2 rounded-full bg-leaf-600 px-3 py-1 text-xs font-semibold text-white">Cover</span>
                    )}
                  </div>
                  <div className="space-y-3 p-3">
                    <CaptionInput item={photo} onSave={(caption) => run(() => updateCaption(photo.id, caption))} />
                    <div className="flex flex-wrap gap-2">
                      {eventId && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => run(() => setCover(eventId, isCover ? null : photo.storage_path))}
                          className={`${secondaryButton} min-h-9 px-4 text-xs`}
                        >
                          {isCover ? "Remove as cover" : "Set as cover"}
                        </button>
                      )}
                      <button type="button" disabled={busy} onClick={() => remove(photo)} className="min-h-9 px-3 text-xs font-semibold text-red-700 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {(videos.length > 0 || documents.length > 0) && (
        <section className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
          <h2 className="font-semibold tracking-tight text-xl text-navy-900">Videos and documents</h2>
          <ul className="mt-4 divide-y divide-navy-900/10">
            {[...videos, ...documents].map((item) => (
              <li key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-leaf-600">
                  {item.kind === "video" ? (parseVideoUrl(item.video_url ?? "")?.provider ?? "video") : "PDF"}
                </span>
                <a
                  href={item.kind === "video" ? item.video_url! : mediaUrl(item.storage_path!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 truncate text-sm font-medium text-navy-800 underline-offset-4 hover:underline sm:max-w-xs"
                >
                  {item.kind === "video" ? item.video_url : "Open file"}
                </a>
                <div className="flex-1">
                  <CaptionInput item={item} onSave={(caption) => run(() => updateCaption(item.id, caption))} />
                </div>
                <button type="button" disabled={busy} onClick={() => remove(item)} className="min-h-9 px-3 text-xs font-semibold text-red-700 hover:text-red-900">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function CaptionInput({ item, onSave }: { item: MediaItem; onSave: (caption: string) => void }) {
  return (
    <input
      key={item.caption ?? ""}
      defaultValue={item.caption ?? ""}
      maxLength={300}
      placeholder="Add a caption"
      aria-label="Caption"
      onBlur={(e) => {
        if (e.target.value.trim() !== (item.caption ?? "")) onSave(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
      className={inputClass.replace("mt-2 ", "")}
    />
  );
}
