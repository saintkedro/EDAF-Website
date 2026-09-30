"use client";

import { useState, useTransition } from "react";
import { saveWinners, type FormState, type WinnerInput } from "@/app/admin/actions";
import { inputClass, primaryButton, secondaryButton } from "@/components/admin/styles";
import type { Winner } from "@/lib/event-utils";

type Row = WinnerInput & { key: string };

const newRow = (position: number): Row => ({ key: crypto.randomUUID(), position, choir: "", denomination: "", prize: "" });

export default function WinnersEditor({ eventId, winners }: { eventId: string; winners: Winner[] }) {
  const [rows, setRows] = useState<Row[]>(() =>
    winners.length
      ? winners.map((w) => ({ key: w.id, position: w.position, choir: w.choir, denomination: w.denomination ?? "", prize: w.prize ?? "" }))
      : [newRow(1), newRow(2), newRow(3)],
  );
  const [state, setState] = useState<FormState>({});
  const [pending, startTransition] = useTransition();

  const update = (key: string, field: keyof WinnerInput, value: string) =>
    setRows((current) => current.map((r) => (r.key === key ? { ...r, [field]: field === "position" ? Number(value) : value } : r)));

  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
      <h2 className="font-semibold tracking-tight text-xl text-navy-900">Winners and prizes</h2>
      <p className="mt-1 text-sm text-muted">Rows without a choir name are ignored.</p>

      <div className="mt-6 space-y-4">
        {rows.map((row) => (
          <fieldset key={row.key} className="grid gap-3 rounded-xl bg-navy-50/60 p-4 sm:grid-cols-[5rem_1fr_1fr_1fr_auto] sm:items-end">
            <legend className="sr-only">Winner in position {row.position}</legend>
            <label className="text-xs font-semibold text-navy-900">
              Position
              <input type="number" min={1} max={50} value={row.position} onChange={(e) => update(row.key, "position", e.target.value)} className={inputClass} />
            </label>
            <label className="text-xs font-semibold text-navy-900">
              Choir
              <input value={row.choir} maxLength={200} onChange={(e) => update(row.key, "choir", e.target.value)} className={inputClass} />
            </label>
            <label className="text-xs font-semibold text-navy-900">
              Denomination
              <input value={row.denomination} maxLength={200} onChange={(e) => update(row.key, "denomination", e.target.value)} className={inputClass} />
            </label>
            <label className="text-xs font-semibold text-navy-900">
              Prize
              <input value={row.prize} maxLength={300} onChange={(e) => update(row.key, "prize", e.target.value)} className={inputClass} />
            </label>
            <button
              type="button"
              onClick={() => setRows((current) => current.filter((r) => r.key !== row.key))}
              className="min-h-11 px-2 text-sm font-semibold text-red-700 hover:text-red-900"
            >
              Remove
            </button>
          </fieldset>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" onClick={() => setRows((current) => [...current, newRow(current.length + 1)])} className={secondaryButton}>
          Add a winner
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(async () => setState(await saveWinners(eventId, rows)))}
          className={primaryButton}
        >
          {pending ? "Saving…" : "Save winners"}
        </button>
        {state.error && <p role="alert" className="text-sm font-medium text-red-700">{state.error}</p>}
        {state.message && <p role="status" className="text-sm font-medium text-leaf-700">{state.message}</p>}
      </div>
    </div>
  );
}
