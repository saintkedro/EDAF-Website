import Link from "next/link";
import { ButtonLink, Eyebrow, Pattern } from "@/components/ui";
import { navLinks } from "@/lib/content";

export default function NotFound() {
  const destinations = navLinks.filter((link) => link.href !== "/");

  return (
    <section className="relative overflow-hidden bg-navy-900">
      <Pattern />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Eyebrow light>Page not found</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100/80">
          The link may be out of date or the page may have moved. Head back to the home page or choose where
          you&apos;d like to go next.
        </p>
        <div className="mt-10">
          <ButtonLink href="/" variant="accent">
            Back to the home page
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-16">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5 font-semibold text-white transition-colors hover:border-leaf-400 hover:bg-white/10"
                >
                  {link.label}
                  <span aria-hidden className="text-leaf-400">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
