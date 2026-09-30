import Link from "next/link";
import { primaryButton } from "@/components/admin/styles";
import { getAdminSession } from "@/lib/admin";
import { getEventSeries } from "@/lib/content";
import { EVENT_FIELDS, formatEventDate, type EventRecord } from "@/lib/event-utils";

export default async function AdminDashboard() {
  const { supabase } = await getAdminSession();
  const { data, error } = await supabase.from("events").select(EVENT_FIELDS).order("starts_on", { ascending: false });
  const events = (data ?? []) as EventRecord[];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-semibold tracking-tight text-3xl text-navy-900">Events</h1>
          <p className="mt-2 text-muted">Each edition of the Public Lecture and the Christmas Carol.</p>
        </div>
        <Link href="/admin/events/new" className={primaryButton}>
          New event
        </Link>
      </div>

      {error && <p className="mt-6 text-sm font-medium text-red-700">Could not load events: {error.message}</p>}

      {events.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-navy-900/20 bg-white px-6 py-12 text-center">
          <p className="font-semibold text-navy-900">No events yet</p>
          <p className="mt-2 text-sm text-muted">Create the first edition to start adding photos, videos and results.</p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-navy-900/10 overflow-hidden rounded-2xl border border-navy-900/10 bg-white">
          {events.map((event) => (
            <li key={event.id}>
              <Link href={`/admin/events/${event.id}`} className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 hover:bg-navy-50">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-navy-900">{event.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {getEventSeries(event.series)?.shortTitle} &middot; {formatEventDate(event.starts_on)}
                  </span>
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    event.published ? "bg-leaf-100 text-leaf-700" : "bg-navy-50 text-navy-800"
                  }`}
                >
                  {event.published ? "Published" : "Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
