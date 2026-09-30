"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui";

type Section = { id: string; label: string };

const ACTIVE_OFFSET = 180;

export default function HubNav({ name, sections }: { name: string; sections: Section[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function update() {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = section.id;
      }
      setActive(atBottom ? sections[sections.length - 1].id : current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  useEffect(() => {
    const list = listRef.current;
    const link = active ? list?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`) : null;
    if (!list || !link) return;
    const outOfView = link.offsetLeft < list.scrollLeft || link.offsetLeft + link.offsetWidth > list.scrollLeft + list.clientWidth;
    if (outOfView) list.scrollTo({ left: link.offsetLeft - 24, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={`${name} sections`} className="sticky top-16 z-40 border-b border-navy-900/10 bg-navy-50 lg:top-20">
      <div className="mx-auto flex h-12 max-w-6xl items-stretch gap-4 px-6 sm:h-14 sm:gap-6">
        <div className="flex shrink-0 items-center gap-2 border-r border-navy-900/10 pr-2 text-sm sm:pr-4">
          <Link
            href="/"
            title="Back to the Edet Amana Foundation home page"
            className="-ml-3 flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-3 font-medium text-muted transition-colors hover:bg-white/60 hover:text-navy-900"
          >
            <Icon name="Home" className="h-5 w-5" />
            <span className="sr-only xl:not-sr-only">Foundation home</span>
          </Link>
          <span aria-hidden className="hidden text-muted xl:inline">
            /
          </span>
          <a href="#top" className="hidden font-semibold text-navy-900 xl:inline">
            {name}
          </a>
        </div>
        <ul ref={listRef} className="relative -mb-px flex flex-1 items-stretch overflow-x-auto [scrollbar-width:none] lg:justify-center">
          {sections.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id} className="flex shrink-0">
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center border-x border-t-[3px] px-4 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-x-navy-900/10 border-t-leaf-500 bg-white text-navy-900"
                      : "border-x-transparent border-t-transparent text-muted hover:bg-white/60 hover:text-navy-900"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#contact"
          className="hidden shrink-0 self-center rounded-full bg-leaf-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-leaf-700 sm:block"
        >
          Enquire
        </a>
      </div>
    </nav>
  );
}
