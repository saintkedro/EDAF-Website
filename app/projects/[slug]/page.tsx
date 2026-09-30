import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, ButtonLink, Eyebrow, Icon, Pattern, PhotoGallery } from "@/components/ui";
import { getInvolved, programmeHref, programmes } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

function findProgramme(slug: string) {
  return programmes.find((p) => p.id === slug && p.details);
}

export function generateStaticParams() {
  return programmes.filter((p) => p.details).map((p) => ({ slug: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const programme = findProgramme((await params).slug);
  if (!programme) return {};
  return { title: programme.title, description: programme.body };
}

export default async function ProgrammePage({ params }: Props) {
  const programme = findProgramme((await params).slug);
  if (!programme?.details) notFound();

  const related = programmes.filter((p) => p.details && p.id !== programme.id);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900">
        {programme.image ? (
          <>
            <Image
              src={programme.image.src}
              alt={programme.image.alt}
              fill
              preload
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: programme.image.focus }}
            />
            <div aria-hidden className="absolute inset-0 bg-navy-950/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy-950/95 lg:via-navy-900/85 lg:to-navy-900/40" />
          </>
        ) : (
          <Pattern />
        )}
        <div className={`relative mx-auto max-w-6xl px-6 py-20 sm:py-28 ${programme.image ? "lg:py-36" : ""}`}>
          <Breadcrumb
            light
            items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: programme.title }]}
          />
          <div className="mt-8 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-600 text-white">
              <Icon name={programme.category} className="h-5 w-5" />
            </span>
            <Eyebrow light>{programme.category}</Eyebrow>
          </div>
          <h1 className="mt-5 max-w-3xl font-semibold tracking-tight text-4xl leading-tight text-white sm:text-5xl">{programme.title}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-6 text-lg leading-relaxed text-ink/85">
          {programme.details.map((block, i) =>
            block.type === "paragraph" ? (
              <p key={i} className={i === 0 ? "text-2xl font-medium leading-snug text-navy-900" : undefined}>
                {block.text}
              </p>
            ) : (
              <section key={i} className="rounded-2xl border border-navy-900/10 bg-white p-8">
                <h2 className="font-semibold tracking-tight text-2xl text-navy-900">{block.title}</h2>
                <ul className="mt-5 space-y-3 text-base">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-leaf-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ),
          )}
        </div>
      </article>

      {programme.gallery && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="font-semibold tracking-tight text-3xl text-navy-900">From the outreach</h2>
          <div className="mt-8">
            <PhotoGallery items={programme.gallery} columns={2} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-navy-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Eyebrow>More of our work</Eyebrow>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={programmeHref(p)}
                  className="group flex items-start gap-5 rounded-2xl border border-navy-900/10 bg-white p-8 transition-colors hover:border-navy-700"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-800 text-leaf-400">
                    <Icon name={p.category} />
                  </span>
                  <span>
                    <span className="block font-semibold tracking-tight text-xl text-navy-900">{p.title}</span>
                    <span className="mt-2 block text-sm font-semibold text-navy-800 group-hover:text-navy-600">
                      Read more <span aria-hidden>&rarr;</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
