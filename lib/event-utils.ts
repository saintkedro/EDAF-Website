import type { EventSeriesSlug } from "@/lib/content";

export type EventRecord = {
  id: string;
  series: EventSeriesSlug;
  slug: string;
  title: string;
  starts_on: string;
  start_time: string | null;
  venue: string | null;
  theme: string | null;
  speaker: string | null;
  summary: string | null;
  body: string | null;
  cover_path: string | null;
  published: boolean;
};

export type Winner = {
  id: string;
  event_id: string;
  position: number;
  choir: string;
  denomination: string | null;
  prize: string | null;
};

export type MediaItem = {
  id: string;
  event_id: string | null;
  kind: "photo" | "video" | "document";
  storage_path: string | null;
  video_url: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  sort_order: number;
  created_at: string;
};

export const EVENT_FIELDS =
  "id, series, slug, title, starts_on, start_time, venue, theme, speaker, summary, body, cover_path, published";
export const MEDIA_FIELDS = "id, event_id, kind, storage_path, video_url, caption, width, height, sort_order, created_at";

export function lagosToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(new Date());
}

export function formatEventDate(date: string, options: Intl.DateTimeFormatOptions = { dateStyle: "long" }) {
  return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function eventYear(event: Pick<EventRecord, "starts_on">) {
  return event.starts_on.slice(0, 4);
}

export function eventHref(event: Pick<EventRecord, "series" | "slug">) {
  return `/events/${event.series}/${event.slug}`;
}

export function ordinal(n: number) {
  const suffix = n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${suffix}`;
}
