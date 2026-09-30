import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteEventButton from "@/components/admin/DeleteEventButton";
import EventForm from "@/components/admin/EventForm";
import MediaManager from "@/components/admin/MediaManager";
import WinnersEditor from "@/components/admin/WinnersEditor";
import { getAdminSession } from "@/lib/admin";
import { EVENT_FIELDS, MEDIA_FIELDS, eventHref, type EventRecord, type MediaItem, type Winner } from "@/lib/event-utils";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Edit event" };

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const { supabase } = await getAdminSession();
  const { data: event } = await supabase.from("events").select(EVENT_FIELDS).eq("id", id).maybeSingle<EventRecord>();
  if (!event) notFound();

  const [{ data: winners }, { data: media }] = await Promise.all([
    supabase.from("event_winners").select("id, event_id, position, choir, denomination, prize").eq("event_id", id).order("position"),
    supabase.from("media").select(MEDIA_FIELDS).eq("event_id", id).order("sort_order").order("created_at"),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <Link href="/admin" className="text-sm font-semibold text-navy-800 hover:text-navy-600">
          <span aria-hidden>&larr;</span> All events
        </Link>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-semibold tracking-tight text-3xl text-navy-900">{event.title}</h1>
          {event.published ? (
            <Link href={eventHref(event)} target="_blank" className="text-sm font-semibold text-navy-800 underline-offset-4 hover:underline">
              View on the site <span aria-hidden>&nearr;</span>
            </Link>
          ) : (
            <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800">Draft: not visible on the site</span>
          )}
        </div>
      </div>

      <section className="max-w-3xl">
        <h2 className="mb-4 font-semibold tracking-tight text-xl text-navy-900">Details</h2>
        <EventForm event={event} />
      </section>

      {event.series === "christmas-carol" && <WinnersEditor eventId={event.id} winners={(winners ?? []) as Winner[]} />}

      <MediaManager eventId={event.id} items={(media ?? []) as MediaItem[]} coverPath={event.cover_path} />

      <section className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8">
        <h2 className="font-semibold tracking-tight text-xl text-navy-900">Delete this event</h2>
        <p className="mt-1 text-sm text-muted">Removes the event with all its photos, videos, documents and winners.</p>
        <div className="mt-4">
          <DeleteEventButton eventId={event.id} />
        </div>
      </section>
    </div>
  );
}
