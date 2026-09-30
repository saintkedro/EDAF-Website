import type { Metadata } from "next";
import GalleryBrowser, { type GalleryPhoto, type GalleryVideo } from "@/components/GalleryBrowser";
import { PageHero } from "@/components/ui";
import { eventSeries, getEventSeries, photos as programmePhotos, type Photo } from "@/lib/content";
import { eventYear } from "@/lib/event-utils";
import { getGalleryMedia } from "@/lib/events";
import { mediaUrl } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from Edet Amana Foundation events, outreaches and programmes.",
};

const categories = [
  ...eventSeries.map((s) => ({ id: s.slug, label: s.shortTitle })),
  { id: "programmes", label: "Programmes & outreach" },
];

export default async function GalleryPage() {
  const media = await getGalleryMedia();

  const photos: GalleryPhoto[] = [];
  const videos: GalleryVideo[] = [];
  for (const item of media) {
    const category = item.event?.series ?? "programmes";
    const year = item.event ? eventYear(item.event) : undefined;
    const meta = item.event ? `${getEventSeries(item.event.series)?.shortTitle} · ${year}` : undefined;
    if (item.kind === "photo" && item.storage_path) {
      photos.push({
        id: item.id,
        src: mediaUrl(item.storage_path),
        alt: item.caption || (item.event ? `Photo from the ${item.event.title}` : "Edet Amana Foundation photo"),
        caption: item.caption,
        meta,
        category,
        year,
      });
    } else if (item.kind === "video" && item.video_url) {
      videos.push({
        id: item.id,
        url: item.video_url,
        title: item.caption || item.event?.title || "Edet Amana Foundation video",
        caption: item.caption ?? item.event?.title,
        category,
        year,
      });
    }
  }

  for (const [key, photo] of Object.entries(programmePhotos) as [string, Photo][]) {
    photos.push({ id: key, src: photo.src, alt: photo.alt, caption: photo.caption, focus: photo.focus, category: "programmes" });
  }

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from our work"
        intro="Photos and videos from our annual events, outreaches and programmes."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <GalleryBrowser categories={categories} photos={photos} videos={videos} />
      </section>
    </>
  );
}
