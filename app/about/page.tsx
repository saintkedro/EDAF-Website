import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Eyebrow, PageHero, PhotoGallery } from "@/components/ui";
import { aboutFull, empoweringChange, founder, gallery, mission, vision } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EDAF"
        title="About the Edet Amana Foundation"
        intro="Coordinating and enhancing philanthropic interventions for people and communities in Nigeria since 2017."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>Who we are</Eyebrow>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
            {aboutFull.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-5">
          <a
            href="#chairman"
            className="group flex items-center gap-6 rounded-2xl border border-navy-900/10 bg-white p-6 transition-colors hover:border-navy-700"
          >
            <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-navy-100">
              <Image
                src={founder.photo.src}
                alt=""
                fill
                placeholder="blur"
                sizes="96px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <Eyebrow>Our Chairman</Eyebrow>
              <p className="mt-2 text-lg font-semibold leading-snug tracking-tight text-navy-900">{founder.name}</p>
              <p className="mt-2 text-sm font-semibold text-navy-800 group-hover:text-navy-600">
                Read his profile <span aria-hidden>&darr;</span>
              </p>
            </div>
          </a>
        </aside>
      </section>

      <section id="chairman" className="scroll-mt-20 border-y border-navy-900/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <figure className="mx-auto max-w-[16rem] text-center sm:max-w-sm lg:sticky lg:top-28 lg:max-w-none lg:text-left">
              <div className="relative aspect-[5/6] overflow-hidden rounded-3xl bg-navy-100">
                <Image
                  src={founder.photo.src}
                  alt={founder.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 352px, (min-width: 640px) 384px, 256px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-5">
                <p className="text-lg font-semibold tracking-tight text-navy-900">{founder.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{founder.role}</p>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-8">
            <Eyebrow>Our Chairman&apos;s profile</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Engineer, builder and philanthropist
            </h2>
            <p className="mt-6 border-l-4 border-leaf-500 pl-5 text-xl font-medium leading-relaxed text-navy-900">
              {founder.legacy}
            </p>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
              {founder.profile.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                { title: "Professional fellowships", items: founder.fellowships },
                { title: "National contributions", items: founder.landmarks },
              ].map((group) => (
                <div key={group.title} className="rounded-2xl bg-navy-50 p-8">
                  <h3 className="text-lg font-semibold tracking-tight text-navy-900">{group.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/80">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="scroll-mt-20 bg-navy-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:py-24 md:grid-cols-2">
          <article className="rounded-2xl bg-navy-900 p-10">
            <Eyebrow light>Our vision</Eyebrow>
            <p className="mt-5 text-2xl font-medium leading-snug text-white">{vision}</p>
          </article>
          <article className="rounded-2xl border border-navy-900/10 bg-white p-10">
            <Eyebrow>Our mission</Eyebrow>
            <p className="mt-5 text-2xl font-medium leading-snug text-navy-900">{mission}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
        <Eyebrow>In the community</Eyebrow>
        <h2 className="mt-4 font-semibold tracking-tight text-3xl text-navy-900 sm:text-4xl">Our work in the community</h2>
        <div className="mt-10">
          <PhotoGallery items={gallery} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24 text-center">
        <Eyebrow>{empoweringChange.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-semibold tracking-tight text-4xl text-navy-900 sm:text-5xl">{empoweringChange.title}</h2>
        <p className="mt-8 text-lg leading-relaxed text-muted">{empoweringChange.body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/projects">See our programmes</ButtonLink>
          <ButtonLink href="/contact#message" variant="outline">
            Join our mission
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
