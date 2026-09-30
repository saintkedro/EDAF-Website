"use client";

import { useId, useState } from "react";

export default function MobileDisclosure({
  showLabel,
  hideLabel,
  children,
}: {
  showLabel: string;
  hideLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <div id={id} className={open ? "block" : "hidden sm:block"}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-5 flex min-h-11 w-full items-center justify-between rounded-xl bg-navy-50 px-4 text-sm font-semibold text-navy-800 sm:hidden"
      >
        {open ? hideLabel : showLabel}
        <span aria-hidden className={`text-lg leading-none transition-transform ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
    </>
  );
}
