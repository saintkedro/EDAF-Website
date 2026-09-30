import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import HubNav from "@/components/HubNav";
import MobileDisclosure from "@/components/MobileDisclosure";
import { Breadcrumb, ButtonLink, Eyebrow, Icon, Pattern, PhotoGallery, SectionHeading } from "@/components/ui";
import { ictHub, photos, site } from "@/lib/content";

export const metadata: Metadata = {
  title: ictHub.name,
  description: ictHub.summary,
};

const highlightIcons = ["Award", "Tools", "Computer"];

export default function IctHubPage() {
  const hero = photos.hubTrainingHall;

  return (
    <div id="top">
      <section className="relative isolate overflow-hidden bg-navy-950">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: "center 60%" }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy-950/95 lg:via-navy-900/85 lg:to-navy-900/30" />
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:pb-32">
          <Breadcrumb light items={[{ label: site.name, href: "/" }, { label: "ICT Hub" }]} />
          <div className="mt-16 sm:mt-20">
            <Eyebrow light>{ictHub.name}</Eyebrow>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            {ictHub.headline}
          </h1>
          <p className="mt-4 text-xl font-medium text-leaf-400">{ictHub.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100/85">{ictHub.summary}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="#trainings" variant="accent">
              See our trainings
            </ButtonLink>
            <ButtonLink href="#contact" variant="outlineLight">
              Contact the Hub
            </ButtonLink>
          </div>
          <p className="mt-12 flex items-center gap-2 text-sm text-navy-100/75">
            <Icon name="Pin" className="h-4 w-4 text-leaf-400" />
            {ictHub.contact.addressLines.join(", ")}
          </p>
        </div>
      </section>

      <HubNav name={ictHub.name} sections={ictHub.sections} />

      <section id="about" className="mx-auto max-w-6xl scroll-mt-32 sm:scroll-mt-40 px-6 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About the Hub" title="Transforming lives through technology" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {ictHub.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              An initiative of the{" "}
              <Link href="/about" className="font-semibold text-navy-800 underline decoration-leaf-500 underline-offset-4">
                {site.name}
              </Link>
              .
            </p>
          </div>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-100 lg:aspect-[4/5]">
            <Image
              src={photos.hubCbtPractice.src}
              alt={photos.hubCbtPractice.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </figure>
        </div>

        <div className="mt-20">
          <Eyebrow>Our Hub in brief</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {ictHub.highlights.map((item, i) => (
              <div key={item.title} className="rounded-2xl border border-navy-900/10 bg-white p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-leaf-100 text-leaf-700">
                  <Icon name={highlightIcons[i]} />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-navy-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="facilities" className="scroll-mt-32 sm:scroll-mt-40 bg-navy-50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <SectionHeading
            eyebrow="Facilities"
            title="A space built for learning and work"
            intro="Classrooms, computer workstations and co-working space in Oron, equipped for practical, hands-on training."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ictHub.facilities.map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl bg-white p-8">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-800 text-leaf-400">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-navy-900">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <PhotoGallery items={ictHub.gallery} columns={3} />
          </div>
        </div>
      </section>

      <section id="trainings" className="mx-auto max-w-6xl scroll-mt-32 sm:scroll-mt-40 px-6 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Trainings"
          title="Get skilled. Get ahead."
          intro="Our programmes are designed to equip learners with practical, hands-on skills that prepare them for employment or self-employment."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ictHub.courses.map((course, i) => (
            <article key={course.title} className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
              <span className="text-sm font-semibold text-leaf-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-navy-900">{course.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{course.summary}</p>
              <MobileDisclosure showLabel="Show course details" hideLabel="Hide course details">
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">{course.heading}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
                  {course.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {"gains" in course && course.gains && (
                  <details className="group mt-6 border-t border-navy-900/10 pt-1">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-navy-800 [&::-webkit-details-marker]:hidden">
                      What you&apos;ll gain
                      <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <ul className="mt-1 space-y-2 text-sm leading-relaxed text-ink/80">
                      {course.gains.map((gain) => (
                        <li key={gain} className="flex gap-3">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-600" />
                          <span>{gain}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                {"outcome" in course && (
                  <dl className="mt-6 space-y-3 border-t border-navy-900/10 pt-4 text-sm">
                    <div>
                      <dt className="font-semibold text-navy-800">Ideal for</dt>
                      <dd className="mt-1 text-ink/80">{course.idealFor}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-navy-800">Outcome</dt>
                      <dd className="mt-1 text-ink/80">{course.outcome}</dd>
                    </div>
                  </dl>
                )}
              </MobileDisclosure>
            </article>
          ))}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-navy-900 p-8">
            <Pattern />
            <div className="relative">
              <h3 className="text-xl font-semibold tracking-tight text-white">{ictHub.enrolment.title}</h3>
              <p className="mt-3 leading-relaxed text-navy-100/85">{ictHub.enrolment.body}</p>
            </div>
            <div className="relative mt-8">
              <ButtonLink href="#contact" variant="accent">
                Enquire about enrolment
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="nsq" className="relative scroll-mt-32 sm:scroll-mt-40 overflow-hidden bg-navy-950">
        <Pattern />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="NBTE accredited" title={ictHub.nsq.title} light />
              <p className="mt-6 leading-relaxed text-navy-100/80">{ictHub.nsq.intro}</p>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">Our NSQ programmes</p>
              <ul className="mt-4 space-y-3">
                {ictHub.nsq.tracks.map((track) => (
                  <li key={track} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white">
                    <Icon name="Tools" className="h-5 w-5 shrink-0 text-leaf-400" />
                    {track}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-2 gap-4">
                {ictHub.nsq.facts.map((fact) => (
                  <div key={fact.label} className="rounded-xl bg-white/5 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-100/60">{fact.label}</dt>
                    <dd className="mt-2 font-semibold text-white">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">Skills you&apos;ll learn in six months</p>
              <ol className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/15 bg-white/5">
                {ictHub.nsq.skills.map((skill, i) => (
                  <li key={skill.title} className="flex gap-5 p-6">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf-600 text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{skill.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-navy-100/75">{skill.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">Why NSQ matters</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {ictHub.nsq.why.map((reason) => {
                  const [title, body] = reason.split(": ");
                  return (
                    <li key={reason} className="rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-navy-100/80">
                      <span className="block font-semibold text-white">{title}</span>
                      {body}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="trainers" className="mx-auto max-w-6xl scroll-mt-32 sm:scroll-mt-40 px-6 py-16 sm:py-24">
        <SectionHeading eyebrow="Join us" title="Join us as a Trainer or Partner" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-leaf-500/40 bg-leaf-50 p-10">
            <h3 className="text-2xl font-semibold tracking-tight text-navy-900">{ictHub.trainers.title}</h3>
            <p className="mt-4 leading-relaxed text-ink/80">{ictHub.trainers.body}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">Who can apply?</p>
            <ul className="mt-3 space-y-3 text-ink/80">
              {ictHub.trainers.whoCanApply.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-leaf-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <ButtonLink href="#contact">Apply to train</ButtonLink>
            </div>
          </div>
          <div className="flex flex-col rounded-3xl border border-navy-900/10 bg-white p-10">
            <h3 className="text-2xl font-semibold tracking-tight text-navy-900">{ictHub.trainers.partnerQuestion}</h3>
            <p className="mt-4 leading-relaxed text-ink/80">{ictHub.trainers.partnerBody}</p>
            <div className="mt-auto pt-8">
              <ButtonLink href="#contact" variant="outline">
                Partner with the Hub
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-32 sm:scroll-mt-40 border-y border-navy-900/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>Partners</Eyebrow>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {ictHub.partners.map((partner) => (
              <li
                key={partner}
                className="grid min-h-24 place-items-center rounded-2xl border border-navy-900/10 bg-cream px-6 py-5 text-center font-semibold text-navy-900"
              >
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-32 sm:scroll-mt-40 px-6 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="relative overflow-hidden rounded-3xl bg-navy-900 p-10 text-navy-100 lg:col-span-5">
            <Pattern />
            <div className="relative">
              <Eyebrow light>Contact</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Visit or reach the Hub</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <Icon name="Pin" className="mt-0.5 h-6 w-6 shrink-0 text-leaf-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-100/60">Address</p>
                    <address className="mt-1 not-italic leading-relaxed text-white">
                      {ictHub.contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <a
                      href={ictHub.contact.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-3 text-sm font-semibold text-leaf-400 hover:text-white"
                    >
                      Open in Google Maps <span aria-hidden>&rarr;</span>
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Icon name="Mail" className="mt-0.5 h-6 w-6 shrink-0 text-leaf-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-100/60">Email</p>
                    <a href={`mailto:${ictHub.contact.email}`} className="inline-block break-all py-2 text-white hover:text-leaf-400">
                      {ictHub.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Icon name="Community" className="mt-0.5 h-6 w-6 shrink-0 text-leaf-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-100/60">Join the community</p>
                    <a
                      href={ictHub.contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-2 text-white hover:text-leaf-400"
                    >
                      facebook.com/edaficthub
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Reach out to us"
              title="Enquire about trainings, CBT or partnerships"
              intro={`Your message goes straight to the Hub at ${ictHub.contact.email}.`}
            />
            <div className="mt-10">
              <ContactForm recipient={ictHub.contact.email} recipientName={ictHub.name} topics={ictHub.contact.topics} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
