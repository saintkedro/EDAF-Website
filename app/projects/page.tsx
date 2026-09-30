import type { Metadata } from "next";
import Link from "next/link";
import HubPromo from "@/components/HubPromo";
import { ButtonLink, Eyebrow, Icon, PageHero, ProgrammeMedia } from "@/components/ui";
import { getInvolved, objectivesIntro, programmeHref, programmes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const scholarship = programmes.find((p) => p.featured);
  const others = programmes.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title="Programmes that transform lives"
        intro={objectivesIntro}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      {scholarship && (
        <section id={scholarship.id} className="mx-auto max-w-6xl scroll-mt-28 px-6 pt-16 sm:pt-24">
          <article className="grid gap-10 rounded-3xl border border-leaf-500/40 bg-leaf-100 p-10 sm:p-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-900 text-leaf-400">
                <Icon name="Education" className="h-8 w-8" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-leaf-700">
                {scholarship.category} &middot; Featured
              </p>
              <h2 className="mt-3 font-semibold tracking-tight text-3xl leading-tight text-navy-900 sm:text-4xl">
                {scholarship.title}
              </h2>
            </div>
            <div className="lg:col-span-8 lg:border-l lg:border-navy-900/15 lg:pl-10">
              <p className="text-lg leading-relaxed text-ink/80">{scholarship.body}</p>
              <div className="mt-8">
                <ButtonLink href="/contact#message">Enquire about the scholarship</ButtonLink>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Eyebrow>Focus areas</Eyebrow>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="group flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white"
            >
              {p.image && <ProgrammeMedia programme={p} sizes="(min-width: 768px) 540px, 100vw" />}
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon name={p.category} />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">{p.category}</p>
                </div>
                <h3 className="mt-6 font-semibold tracking-tight text-2xl text-navy-900">{p.title}</h3>
                {p.body && <p className="mt-4 leading-relaxed text-muted">{p.body}</p>}
                {p.details && (
                  <Link
                    href={programmeHref(p)}
                    className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-navy-800 hover:text-navy-600"
                  >
                    Read more<span className="sr-only"> about {p.title}</span> <span aria-hidden>&rarr;</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <HubPromo />

      <section id="get-involved" className="scroll-mt-28 bg-navy-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow light>Take part</Eyebrow>
            <h2 className="mt-4 font-semibold tracking-tight text-3xl text-white sm:text-4xl">{getInvolved.title}</h2>
            <p className="mt-4 leading-relaxed text-navy-100/80">{getInvolved.body}</p>
          </div>
          <ButtonLink href="/contact#message" variant="accent">
            Get in touch
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
