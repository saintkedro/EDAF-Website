import type { Metadata } from "next";
import { EmptyState, EventGrid, SeriesCard } from "@/components/events";
import { Eyebrow, PageHero } from "@/components/ui";
import { eventSeries } from "@/lib/content";
import { lagosToday } from "@/lib/event-utils";
import { getPublishedEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "The Edet Amana Foundation's annual events: the Sir Edet Amana Annual Public Lecture and the Annual Christmas Carol at Oyubia.",
};

export default async function EventsPage() {
  const events = await getPublishedEvents();
  const today = lagosToday();
  const upcoming = events.filter((e) => e.starts_on >= today).reverse();
  const past = events.filter((e) => e.starts_on < today);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Our annual events"
        intro="Every year the Foundation brings the community together for two events: a public lecture and a Christmas carol."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
        <div className="grid gap-6 md:grid-cols-2">
          {eventSeries.map((series) => (
            <SeriesCard key={series.slug} series={series} />
          ))}
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
          <Eyebrow>Coming up</Eyebrow>
          <h2 className="mt-4 font-semibold tracking-tight text-3xl text-navy-900">Upcoming events</h2>
          <div className="mt-8">
            <EventGrid events={upcoming} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Eyebrow>Past editions</Eyebrow>
        <h2 className="mt-4 font-semibold tracking-tight text-3xl text-navy-900">Recent events</h2>
        <div className="mt-8">
          {past.length > 0 ? (
            <EventGrid events={past} />
          ) : (
            <EmptyState
              title="Event reports are on the way"
              body="Photos, videos and highlights from each edition will be published here."
            />
          )}
        </div>
      </section>
    </>
  );
}
