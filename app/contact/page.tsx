import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Eyebrow, PageHero } from "@/components/ui";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We'd love to hear from you"
        intro={contact.invitation}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          {[contact.headOffice, contact.siteOffice].map((office) => (
            <article key={office.label} className="rounded-2xl border border-navy-900/10 bg-white p-8">
              <Eyebrow>{office.label}</Eyebrow>
              <address className="mt-4 not-italic leading-relaxed text-ink/80">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </article>
          ))}
          <article className="rounded-2xl bg-navy-900 p-8">
            <Eyebrow light>Reach us directly</Eyebrow>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${contact.email}`} className="break-all text-lg text-white hover:text-leaf-400">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="text-lg text-white hover:text-leaf-400">
                  {contact.phone}
                </a>
              </li>
            </ul>
          </article>
        </div>

        <div id="message" className="scroll-mt-28 lg:col-span-7">
          <div className="rounded-3xl border border-navy-900/10 bg-white p-8 shadow-sm sm:p-10">
            <Eyebrow>Send a message</Eyebrow>
            <h2 className="mt-4 font-semibold tracking-tight text-3xl text-navy-900">Partner, support, or ask a question</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Whether you want to support a programme, make a donation, enquire about the Sir Edet Amana
              Scholarship, or work with us, tell us how you&apos;d like to help.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
