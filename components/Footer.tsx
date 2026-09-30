import Link from "next/link";
import Logo from "@/components/Logo";
import { contact, navLinks, site, vision } from "@/lib/content";

const programmeLinks = [
  ...(navLinks.find((link) => link.href === "/projects")?.children ?? []).filter((link) => link.href !== "/projects"),
  { href: "/ict-hub", label: "EDAF ICT Hub" },
];

const involvedLinks = [
  { href: "/contact#message", label: "Get involved" },
  { href: "/projects#scholarship", label: "Scholarship enquiries" },
  { href: "/ict-hub#contact", label: "ICT Hub enquiries" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo onDark />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-100/75">{vision}</p>
        </div>

        <FooterLinks title="Explore" links={navLinks} className="lg:col-span-2" />
        <FooterLinks title="Programmes" links={programmeLinks} className="lg:col-span-3" />

        <div className="lg:col-span-3">
          <FooterLinks title="Take part" links={involvedLinks} />
          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">Reach us</h2>
          <ul className="mt-2 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="inline-block break-all py-2 text-navy-100/80 hover:text-white">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="inline-block py-2 text-navy-100/80 hover:text-white">
                {contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 text-sm sm:grid-cols-2">
          {[contact.headOffice, contact.siteOffice].map((office) => (
            <div key={office.label}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">{office.label}</h2>
              <address className="mt-3 not-italic leading-relaxed text-navy-100/80">{office.lines.join(", ")}</address>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-navy-100/70 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>Find us on {contact.socials.join(", ")}</span>
            <a href="#top" className="inline-flex items-center gap-1.5 py-2 font-medium text-white hover:text-leaf-400">
              Back to top <span aria-hidden>&uarr;</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">{title}</h2>
      <ul className="mt-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-block py-2 text-navy-100/80 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
