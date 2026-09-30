import Image from "next/image";
import Link from "next/link";
import type { Photo, Programme } from "@/lib/content";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.25em] ${
        light ? "text-leaf-400" : "text-leaf-600"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 font-semibold tracking-tight text-3xl leading-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-navy-100/80" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <Pattern />
      <div className={`relative mx-auto max-w-6xl px-6 pb-20 sm:pb-28 ${breadcrumb ? "pt-10" : "pt-20 sm:pt-28"}`}>
        {breadcrumb && (
          <div className="mb-12 sm:mb-16">
            <Breadcrumb light items={breadcrumb} />
          </div>
        )}
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-semibold tracking-tight text-4xl leading-tight text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100/80">{intro}</p>}
      </div>
    </section>
  );
}

export function Pattern() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="edaf-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#3dbe73" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#edaf-dots)" />
      </svg>
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[40px] border-sky-brand/70" />
    </div>
  );
}

export function Breadcrumb({ items, light = false }: { items: { label: string; href?: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${light ? "text-navy-100/75" : "text-muted"}`}>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className={`font-medium underline-offset-4 hover:underline ${light ? "hover:text-white" : "hover:text-navy-900"}`}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={`font-semibold ${light ? "text-white" : "text-navy-900"}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "accent" | "outline" | "outlineLight";
}) {
  const styles = {
    primary: "bg-navy-800 text-white hover:bg-navy-700",
    accent: "bg-leaf-600 text-white hover:bg-leaf-700",
    outline: "border border-navy-800/30 text-navy-900 hover:border-navy-800 hover:bg-navy-50",
    outlineLight: "border border-white/30 text-white hover:border-white hover:bg-white/10",
  };
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}

const iconPaths: Record<string, React.ReactNode> = {
  Education: (
    <>
      <path d="M3 9l9-5 9 5-9 5-9-5z" />
      <path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" />
      <path d="M21 9v6" />
    </>
  ),
  Healthcare: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z M12 9v5 M9.5 11.5h5" />,
  Health: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z M12 9v5 M9.5 11.5h5" />,
  Empowerment: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M17 11l2-2 2 2 M19 9v7" />
    </>
  ),
  "Economic Empowerment": (
    <>
      <path d="M4 19h16" />
      <path d="M6 16v-4 M10 16V9 M14 16v-6 M18 16V6" />
    </>
  ),
  Community: (
    <>
      <path d="M3 21V10l9-6 9 6v11" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  Home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  Computer: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8 M12 16v4" />
    </>
  ),
  Tools: <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z" />,
  Award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13l-1.5 8 5-3 5 3-1.5-8" />
    </>
  ),
  Pin: (
    <>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0114 0C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  Mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
};

export function ProgrammeMedia({ programme, sizes = "(min-width: 768px) 360px, 100vw" }: { programme: Programme; sizes?: string }) {
  if (programme.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
        <Image
          src={programme.image.src}
          alt={programme.image.alt}
          fill
          placeholder="blur"
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }
  return (
    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-navy-900 text-leaf-400">
      <Pattern />
      <Icon name={programme.category} className="relative h-12 w-12" />
    </div>
  );
}

const galleryLayouts = {
  2: { grid: "", sizes: "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw" },
  3: { grid: "lg:grid-cols-3", sizes: "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" },
  4: { grid: "lg:grid-cols-4", sizes: "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" },
};

export function PhotoGallery({ items, columns = 4 }: { items: Photo[]; columns?: 2 | 3 | 4 }) {
  const layout = galleryLayouts[columns];
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${layout.grid}`}>
      {items.map((photo) => (
        <figure key={photo.caption} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              sizes={layout.sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: photo.focus }}
            />
          </div>
          <figcaption className="px-4 py-3 text-sm font-medium text-navy-900">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {iconPaths[name] ?? iconPaths.Community}
    </svg>
  );
}
