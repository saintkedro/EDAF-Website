import type { Metadata } from "next";
import MediaManager from "@/components/admin/MediaManager";
import { getAdminSession } from "@/lib/admin";
import { MEDIA_FIELDS, type MediaItem } from "@/lib/event-utils";

export const metadata: Metadata = { title: "General gallery" };

export default async function AdminGalleryPage() {
  const { supabase } = await getAdminSession();
  const { data } = await supabase
    .from("media")
    .select(MEDIA_FIELDS)
    .is("event_id", null)
    .order("sort_order")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold tracking-tight text-3xl text-navy-900">General gallery</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Photos and videos that are not tied to an event, such as outreaches and programmes. They appear on the public Gallery page
          under &ldquo;Programmes &amp; outreach&rdquo;.
        </p>
      </div>
      <MediaManager eventId={null} items={(data ?? []) as MediaItem[]} />
    </div>
  );
}
