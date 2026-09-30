import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { ictHub, photos } from "@/lib/content";

export default function HubPromo() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
      <div className="grid overflow-hidden rounded-3xl border border-navy-900/10 bg-white lg:grid-cols-2">
        <div className="relative aspect-[16/10] lg:aspect-auto">
          <Image
            src={photos.hubTrainingHall.src}
            alt={photos.hubTrainingHall.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
          />
        </div>
        <div className="p-10 sm:p-14">
          <Eyebrow>{ictHub.name}</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy-900">{ictHub.headline}</h2>
          <p className="mt-5 leading-relaxed text-muted">{ictHub.summary}</p>
          <p className="mt-4 text-sm font-medium text-navy-800">
            {ictHub.highlights.map((h) => h.title).join(" · ")}
          </p>
          <div className="mt-8">
            <ButtonLink href="/ict-hub">Visit the ICT Hub</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
