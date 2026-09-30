import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState, EventGrid } from "@/components/events";
import { ButtonLink, Eyebrow, PageHero } from "@/components/ui";
import { eventSeries, getEventSeries, type EventSeriesSlug } from "@/lib/content";
import { getPublishedEvents } from "@/lib/events";

type Props = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  return eventSeries.map((s) => ({ series: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const series = getEventSeries((await params).series);
  if (!series) return {};
  return { title: series.title, description: series.summary };
}

export default async function EventSeriesPage({ params }: Props) {
  const series = getEventSeries((await params).series);
  if (!series) notFound();

  const events = await getPublishedEvents(series.slug as EventSeriesSlug);

  return (
    <>
      <PageHero
        eyebrow="Annual event"
        title={series.title}
        intro={series.summary}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: series.shortTitle }]}
      />

      <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
        <dl className="grid gap-4 sm:grid-cols-3">
          {series.facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-navy-900/10 bg-white p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">{fact.label}</dt>
              <dd className="mt-2 font-medium text-navy-900">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Eyebrow>Editions</Eyebrow>
        <h2 className="mt-4 font-semibold tracking-tight text-3xl text-navy-900">Year by year</h2>
        <div className="mt-8">
          {events.length > 0 ? (
            <EventGrid events={events} />
          ) : (
            <EmptyState
              title="Editions will appear here"
              body={`Photos, videos and highlights from each ${series.shortTitle} will be published on this page.`}
            />
          )}
        </div>
        <div className="mt-10">
          <ButtonLink href="/contact#message" variant="outline">
            Ask about the next edition
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
