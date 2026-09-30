import Image from "next/image";
import Link from "next/link";
import HubPromo from "@/components/HubPromo";
import { ButtonLink, Eyebrow, Icon, Pattern, ProgrammeMedia, SectionHeading } from "@/components/ui";
import {
  aboutSummary,
  founder,
  getInvolved,
  objectives,
  objectivesIntro,
  photos,
  programmeHref,
  programmes,
  vision,
} from "@/lib/content";

const heroFacts = [
  { label: "Established", value: "2017" },
  { label: "Offices", value: "Lagos & Oron" },
  { label: "Focus", value: "Education · Health · Empowerment" },
  { label: "Founder's scholarships", value: "2,000+" },
];

export default function Home() {
  const scholarship = programmes.find((p) => p.featured);
  const preview = programmes.filter((p) => !p.featured && p.body).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950">
        <Image
          src={photos.consultation.src}
          alt={photos.consultation.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="-z-10 object-cover object-[70%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-navy-950/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy-950 lg:via-navy-950/85 lg:to-navy-900/30"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950/90 to-transparent" />

        <div className="mx-auto max-w-6xl px-6 pb-12 pt-20 sm:pt-28 lg:pt-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400 backdrop-blur">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
              <span className="hidden sm:inline">Independent</span> Nigerian charity &middot; Est. 2017
            </p>
            <h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Edet Amana
              <span className="block">Foundation</span>
            </h1>
            <p className="mt-5 text-2xl font-medium text-leaf-400 sm:text-3xl">
              &hellip;transforming lives!
            </p>
            <div aria-hidden className="mt-8 h-1 w-20 rounded-full bg-sky-brand lg:mt-6" />
            <p className="mt-8 max-w-2xl lg:mt-6 text-lg leading-relaxed text-navy-100/90 sm:text-xl">{vision}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/projects" variant="accent">
                Explore our work
              </ButtonLink>
              <ButtonLink href="/about" variant="outlineLight">
                About the Foundation
              </ButtonLink>
            </div>
          </div>

          <dl className="mt-16 lg:mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur lg:grid-cols-4">
            {heroFacts.map((fact, i) => (
              <div
                key={fact.label}
                className={`p-6 sm:p-8 lg:px-8 lg:py-6 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-100/60">{fact.label}</dt>
                <dd className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <figure className="overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={photos.dental.src}
            alt={photos.dental.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] h-auto w-full object-cover"
          />
        </figure>
        <div>
          <SectionHeading eyebrow="About us" title="An independent Nigerian charity" />
          <p className="mt-6 text-lg leading-relaxed text-muted">{aboutSummary}</p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-navy-600"
          >
            Read our story <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-900">
        <Pattern />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-12">
          <figure className="relative mx-auto w-full max-w-[16rem] sm:max-w-sm lg:col-span-5">
            <div aria-hidden className="absolute -inset-3 rounded-[2rem] border-2 border-leaf-400/40" />
            <div className="relative aspect-[5/6] overflow-hidden rounded-3xl bg-navy-800">
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 640px) 384px, 256px"
                className="object-cover object-top"
              />
            </div>
          </figure>
          <div className="lg:col-span-7">
            <Eyebrow light>Our Chairman</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{founder.name}</h2>
            <p className="mt-3 text-sm font-medium text-leaf-400">{founder.role}</p>
            <p className="mt-6 text-lg leading-relaxed text-navy-100/85">{founder.summary}</p>
            <p className="mt-4 leading-relaxed text-navy-100/70">{founder.legacy}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {founder.highlights.map((item) => (
                <div key={item.label} className="flex flex-col-reverse justify-end rounded-xl border border-white/10 bg-white/5 p-4">
                  <dt className="mt-1 text-xs leading-snug text-navy-100/70">{item.label}</dt>
                  <dd className="text-xl font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <ButtonLink href="/about#chairman" variant="accent">
                Read the Chairman&apos;s profile
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Our objectives" title="Empowering communities" intro={objectivesIntro} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {objectives.map((item) => (
              <article
                key={item.title}
                className="flex gap-5 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:block md:p-8"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-800 text-leaf-400">
                  <Icon name={item.title} />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight text-xl text-navy-900 md:mt-6 md:text-2xl">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted md:mt-3">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {scholarship && (
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid overflow-hidden rounded-3xl bg-navy-900 lg:grid-cols-5">
            <div className="relative flex items-center justify-center bg-leaf-600 p-12 lg:col-span-2">
              <div className="text-center text-white">
                <Icon name="Education" className="mx-auto h-16 w-16" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em]">Featured programme</p>
              </div>
            </div>
            <div className="p-10 sm:p-14 lg:col-span-3">
              <Eyebrow light>{scholarship.category}</Eyebrow>
              <h2 className="mt-4 font-semibold tracking-tight text-3xl text-white sm:text-4xl">{scholarship.title}</h2>
              <p className="mt-5 leading-relaxed text-navy-100/85">{scholarship.body}</p>
              <div className="mt-8">
                <ButtonLink href={`/projects#${scholarship.id}`} variant="accent">
                  Learn about the scholarship
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Our initiatives" title="Programmes that add value" />
          <ButtonLink href="/projects" variant="outline">
            View all programmes
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {preview.map((p) => (
            <Link
              key={p.id}
              href={programmeHref(p)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white transition-colors hover:border-navy-700"
            >
              <ProgrammeMedia programme={p} />
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-semibold tracking-tight text-xl text-navy-900">{p.title}</h3>
                <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                <span className="mt-6 text-sm font-semibold text-navy-800 group-hover:text-navy-600">
                  Read more <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HubPromo />

      <section className="relative overflow-hidden bg-navy-950">
        <Pattern />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow light>Take part</Eyebrow>
            <h2 className="mt-4 font-semibold tracking-tight text-3xl text-white sm:text-4xl">{getInvolved.title}</h2>
            <p className="mt-4 leading-relaxed text-navy-100/80">{getInvolved.body}</p>
          </div>
          <ButtonLink href="/contact#message" variant="accent">
            Contact the Foundation
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
