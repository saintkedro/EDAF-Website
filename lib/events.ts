import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { EventSeriesSlug } from "@/lib/content";
import { EVENT_FIELDS, MEDIA_FIELDS, type EventRecord, type MediaItem, type Winner } from "@/lib/event-utils";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/config";

export const EVENTS_TAG = "events";

export type EventWithDetails = EventRecord & { winners: Winner[]; media: MediaItem[] };
export type GalleryItem = MediaItem & { event: Pick<EventRecord, "series" | "slug" | "title" | "starts_on"> | null };

function publicClient() {
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { tags: [EVENTS_TAG], revalidate: 3600 } }),
    },
  });
}

export async function getPublishedEvents(series?: EventSeriesSlug): Promise<EventRecord[]> {
  if (!isSupabaseConfigured) return [];
  let query = publicClient().from("events").select(EVENT_FIELDS).eq("published", true);
  if (series) query = query.eq("series", series);
  const { data, error } = await query.order("starts_on", { ascending: false });
  if (error) {
    console.error("Failed to load events:", error.message);
    return [];
  }
  return data as EventRecord[];
}

export async function getPublishedEvent(series: string, slug: string): Promise<EventWithDetails | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = publicClient();
  const { data: event, error } = await supabase
    .from("events")
    .select(EVENT_FIELDS)
    .eq("published", true)
    .eq("series", series)
    .eq("slug", slug)
    .maybeSingle();
  if (error) console.error("Failed to load event:", error.message);
  if (!event) return null;

  const [winners, media] = await Promise.all([
    supabase
      .from("event_winners")
      .select("id, event_id, position, choir, denomination, prize")
      .eq("event_id", event.id)
      .order("position"),
    supabase.from("media").select(MEDIA_FIELDS).eq("event_id", event.id).order("sort_order").order("created_at"),
  ]);
  return {
    ...(event as EventRecord),
    winners: (winners.data ?? []) as Winner[],
    media: (media.data ?? []) as MediaItem[],
  };
}

export async function getGalleryMedia(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await publicClient()
    .from("media")
    .select(`${MEDIA_FIELDS}, event:events(series, slug, title, starts_on, published)`)
    .in("kind", ["photo", "video"])
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load gallery:", error.message);
    return [];
  }
  type Row = MediaItem & { event: (NonNullable<GalleryItem["event"]> & { published: boolean }) | null };
  return (data as unknown as Row[]).filter((item) => !item.event_id || item.event?.published);
}
