"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { navLinks, type NavLink } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/10 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-5 whitespace-nowrap lg:flex xl:gap-7" aria-label="Main">
          {navLinks.map((link) =>
            link.children ? (
              <DesktopDropdown key={link.href} link={link} active={isActive(link.href)} pathname={pathname} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={topLinkClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            href="/contact#message"
            className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Get Involved
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-navy-900 hover:bg-navy-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy-900/10 bg-white lg:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(link.href) ? "bg-navy-100 text-navy-900" : "text-ink hover:bg-navy-50"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <ul className="mb-2 ml-3 border-l-2 border-leaf-500/40 pl-3">
                    {link.children
                      .filter((child) => child.href !== link.href)
                      .map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            aria-current={child.href === pathname ? "page" : undefined}
                            className={`block rounded-lg px-3 py-2 text-sm ${
                              child.href === pathname
                                ? "font-semibold text-navy-900"
                                : "text-muted hover:bg-navy-50 hover:text-navy-900"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/contact#message"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-navy-800 px-5 py-3 text-center font-semibold text-white"
              >
                Get Involved
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function topLinkClass(active: boolean) {
  return `text-sm font-medium transition-colors hover:text-navy-700 ${
    active ? "text-navy-800 underline decoration-leaf-500 decoration-2 underline-offset-8" : "text-muted"
  }`;
}

function DesktopDropdown({ link, active, pathname }: { link: NavLink; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pointerType = useRef("mouse");
  const menuId = `menu-${link.label.toLowerCase()}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative flex items-center gap-1"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onPointerDown={(e) => (pointerType.current = e.pointerType)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link href={link.href} aria-current={active ? "page" : undefined} className={topLinkClass(active)}>
        {link.label}
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${link.label} pages`}
        onClick={(e) => setOpen((v) => (e.detail > 0 && pointerType.current === "mouse" ? true : !v))}
        className="grid h-6 w-6 place-items-center rounded-full text-muted hover:bg-navy-50 hover:text-navy-900"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div id={menuId} className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
          <ul className="w-64 rounded-2xl border border-navy-900/10 bg-white p-2 shadow-xl shadow-navy-900/10">
            {link.children?.map((child) => {
              const current = child.href === pathname;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "page" : undefined}
                    className={`flex items-center justify-between gap-3 whitespace-normal rounded-xl px-4 py-2.5 text-sm transition-colors ${
                      current ? "bg-navy-50 font-semibold text-navy-900" : "text-ink hover:bg-navy-50 hover:text-navy-900"
                    }`}
                  >
                    {child.label}
                    {current && <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
