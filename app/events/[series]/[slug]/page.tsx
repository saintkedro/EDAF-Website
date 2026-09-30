import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoLightboxGrid from "@/components/PhotoLightboxGrid";
import VideoEmbed from "@/components/VideoEmbed";
import { Breadcrumb, Eyebrow, Icon, Pattern } from "@/components/ui";
import { getEventSeries } from "@/lib/content";
import { eventYear, formatEventDate, ordinal } from "@/lib/event-utils";
import { getPublishedEvent } from "@/lib/events";
import { mediaUrl } from "@/lib/supabase/config";

type Props = { params: Promise<{ series: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series, slug } = await params;
  const event = await getPublishedEvent(series, slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary ?? getEventSeries(event.series)?.summary,
    openGraph: event.cover_path ? { images: [mediaUrl(event.cover_path)] } : undefined,
  };
}

export default async function EventPage({ params }: Props) {
  const { series: seriesSlug, slug } = await params;
  const series = getEventSeries(seriesSlug);
  const event = series ? await getPublishedEvent(seriesSlug, slug) : null;
  if (!series || !event) notFound();

  const photos = event.media.filter((m) => m.kind === "photo" && m.storage_path);
  const videos = event.media.filter((m) => m.kind === "video" && m.video_url);
  const documents = event.media.filter((m) => m.kind === "document" && m.storage_path);
  const paragraphs = (event.body ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const details = [
    { label: "Date", value: formatEventDate(event.starts_on, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
    { label: "Time", value: event.start_time },
    { label: "Venue", value: event.venue },
    { label: "Theme", value: event.theme },
    { label: series.slug === "public-lecture" ? "Guest lecturer" : "Special guest", value: event.speaker },
  ].filter((d): d is { label: string; value: string } => Boolean(d.value));

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900">
        {event.cover_path ? (
          <>
            <Image src={mediaUrl(event.cover_path)} alt="" fill preload sizes="100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-navy-950/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy-950/95 lg:via-navy-900/85 lg:to-navy-900/40" />
          </>
        ) : (
          <Pattern />
        )}
        <div className={`relative mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pb-28 ${event.cover_path ? "lg:pb-36" : ""}`}>
          <Breadcrumb
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Events", href: "/events" },
              { label: series.shortTitle, href: `/events/${series.slug}` },
              { label: eventYear(event) },
            ]}
          />
          <div className="mt-12 flex items-center gap-3 sm:mt-16">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-600 text-white">
              <Icon name={series.icon} className="h-5 w-5" />
            </span>
            <Eyebrow light>{series.shortTitle}</Eyebrow>
          </div>
          <h1 className="mt-5 max-w-3xl font-semibold tracking-tight text-4xl leading-tight text-white sm:text-5xl">{event.title}</h1>
          {event.summary && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100/85">{event.summary}</p>}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <dl className="divide-y divide-navy-900/10 rounded-2xl border border-navy-900/10 bg-white">
            {details.map((d) => (
              <div key={d.label} className="px-6 py-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">{d.label}</dt>
                <dd className="mt-1 font-medium text-navy-900">{d.value}</dd>
              </div>
            ))}
          </dl>
          {documents.length > 0 && (
            <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">Documents</h2>
              <ul className="mt-3 space-y-2">
                {documents.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={mediaUrl(doc.storage_path!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 py-1 font-medium text-navy-800 underline-offset-4 hover:underline"
                    >
                      {doc.caption || "Download document"} <span className="text-xs text-muted">(PDF)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="space-y-16 lg:col-span-8">
          {paragraphs.length > 0 && (
            <article className="space-y-6 text-lg leading-relaxed text-ink/85">
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </article>
          )}

          {event.winners.length > 0 && (
            <section>
              <h2 className="font-semibold tracking-tight text-3xl text-navy-900">Winners</h2>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-900/10 bg-white">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <thead className="bg-navy-50 text-xs uppercase tracking-[0.15em] text-navy-800">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Position</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Choir</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Denomination</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Prize</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-900/10">
                    {event.winners.map((w) => (
                      <tr key={w.id}>
                        <td className="px-5 py-4 font-semibold text-navy-900">{ordinal(w.position)}</td>
                        <td className="px-5 py-4 font-medium text-navy-900">{w.choir}</td>
                        <td className="px-5 py-4 text-muted">{w.denomination}</td>
                        <td className="px-5 py-4 text-ink/85">{w.prize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {videos.length > 0 && (
            <section>
              <h2 className="font-semibold tracking-tight text-3xl text-navy-900">Videos</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {videos.map((v) => (
                  <figure key={v.id}>
                    <VideoEmbed url={v.video_url!} title={v.caption || event.title} />
                    {v.caption && <figcaption className="mt-2 text-sm text-muted">{v.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {photos.length > 0 && (
        <section className="bg-navy-50">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <h2 className="font-semibold tracking-tight text-3xl text-navy-900">Photos</h2>
            <div className="mt-8">
              <PhotoLightboxGrid
                photos={photos.map((p) => ({
                  id: p.id,
                  src: mediaUrl(p.storage_path!),
                  alt: p.caption || `Photo from the ${event.title}`,
                  caption: p.caption,
                }))}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
