import Image from "next/image";
import Link from "next/link";
import { Icon, Pattern } from "@/components/ui";
import { getEventSeries, type EventSeries } from "@/lib/content";
import { eventHref, formatEventDate, type EventRecord } from "@/lib/event-utils";
import { mediaUrl } from "@/lib/supabase/config";

export function SeriesCard({ series }: { series: EventSeries }) {
  return (
    <Link
      href={`/events/${series.slug}`}
      className="group flex flex-col rounded-2xl border border-navy-900/10 bg-white p-8 transition-colors hover:border-navy-700 sm:p-10"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-800 text-leaf-400">
        <Icon name={series.icon} />
      </span>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">Held every year</p>
      <h3 className="mt-3 font-semibold tracking-tight text-2xl text-navy-900">{series.title}</h3>
      <p className="mt-4 leading-relaxed text-muted">{series.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-navy-800 group-hover:text-navy-600">
        View editions <span aria-hidden>&rarr;</span>
      </span>
    </Link>
  );
}

export function EventCard({ event }: { event: EventRecord }) {
  const series = getEventSeries(event.series);
  return (
    <Link
      href={eventHref(event)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white transition-colors hover:border-navy-700"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
        {event.cover_path ? (
          <Image
            src={mediaUrl(event.cover_path)}
            alt=""
            fill
            sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-leaf-400">
            <Pattern />
            <Icon name={series?.icon ?? "Award"} className="relative h-12 w-12" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">{series?.shortTitle}</p>
        <h3 className="mt-3 font-semibold tracking-tight text-xl text-navy-900">{event.title}</h3>
        <p className="mt-3 text-sm text-muted">
          <time dateTime={event.starts_on}>{formatEventDate(event.starts_on)}</time>
          {event.venue && <> &middot; {event.venue}</>}
        </p>
        {event.summary && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/80">{event.summary}</p>}
      </div>
    </Link>
  );
}

export function EventGrid({ events }: { events: EventRecord[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy-900/20 bg-white px-6 py-12 text-center">
      <p className="font-semibold text-navy-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
