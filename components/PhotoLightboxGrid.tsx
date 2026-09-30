"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type LightboxPhoto = {
  id: string;
  src: string | StaticImageData;
  alt: string;
  caption?: string | null;
  meta?: string;
  focus?: string;
};

export default function PhotoLightboxGrid({ photos }: { photos: LightboxPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => trigger?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-navy-100"
              aria-label={`Open photo${photo.caption ? `: ${photo.caption}` : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 280px, 50vw"
                placeholder={typeof photo.src === "string" ? "empty" : "blur"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: photo.focus }}
              />
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? "Photo"}
          className="fixed inset-0 z-[70] flex flex-col bg-navy-950"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm text-navy-100">
            <span>
              {index! + 1} / {photos.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10"
              aria-label="Close"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            {photos.length > 1 && (
              <>
                <LightboxArrow direction="prev" onClick={() => step(-1)} />
                <LightboxArrow direction="next" onClick={() => step(1)} />
              </>
            )}
          </div>
          {(current.caption || current.meta) && (
            <div className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
              {current.caption && <p className="font-medium text-white">{current.caption}</p>}
              {current.meta && <p className="mt-1 text-sm text-navy-100/70">{current.meta}</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function LightboxArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 ${
        direction === "prev" ? "left-3" : "right-3"
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
