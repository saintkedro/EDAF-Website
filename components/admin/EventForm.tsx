"use client";

import { startTransition, useActionState, useState } from "react";
import { saveEvent, type FormState } from "@/app/admin/actions";
import { hintClass, inputClass, labelClass, primaryButton } from "@/components/admin/styles";
import { eventSeries } from "@/lib/content";
import type { EventRecord } from "@/lib/event-utils";

export default function EventForm({ event }: { event?: EventRecord }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEvent, {});
  const [series, setSeries] = useState<string>(event?.series ?? eventSeries[0].slug);
  const [date, setDate] = useState(event?.starts_on ?? "");
  const seriesInfo = eventSeries.find((s) => s.slug === series)!;
  const isLecture = series === "public-lecture";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
      }}
      className="space-y-6 rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
      {event && <input type="hidden" name="id" value={event.id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="series" className={labelClass}>
            Annual event
          </label>
          <select id="series" name="series" value={series} onChange={(e) => setSeries(e.target.value)} className={inputClass}>
            {eventSeries.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="starts_on" className={labelClass}>
            Date
          </label>
          <input
            id="starts_on"
            name="starts_on"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={event?.title}
          maxLength={200}
          placeholder={`${date.slice(0, 4) || "2026"} ${seriesInfo.title}`}
          className={inputClass}
        />
        <p className={hintClass}>Leave blank to use the suggested title.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="start_time" className={labelClass}>
            Time
          </label>
          <input id="start_time" name="start_time" defaultValue={event?.start_time ?? ""} maxLength={40} placeholder="e.g. 10:00 am" className={inputClass} />
        </div>
        <div>
          <label htmlFor="venue" className={labelClass}>
            Venue
          </label>
          <input
            id="venue"
            name="venue"
            defaultValue={event?.venue ?? ""}
            maxLength={300}
            placeholder={isLecture ? "" : "e.g. Oyubia, Oron"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="theme" className={labelClass}>
            {isLecture ? "Lecture topic" : "Theme"}
          </label>
          <input id="theme" name="theme" defaultValue={event?.theme ?? ""} maxLength={300} className={inputClass} />
        </div>
        <div>
          <label htmlFor="speaker" className={labelClass}>
            {isLecture ? "Guest lecturer" : "Special guest"}
          </label>
          <input id="speaker" name="speaker" defaultValue={event?.speaker ?? ""} maxLength={300} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Short summary
        </label>
        <textarea id="summary" name="summary" rows={2} defaultValue={event?.summary ?? ""} maxLength={600} className={inputClass} />
        <p className={hintClass}>One or two sentences shown on event cards and in search results.</p>
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>
          Full report
        </label>
        <textarea id="body" name="body" rows={10} defaultValue={event?.body ?? ""} maxLength={20000} className={inputClass} />
        <p className={hintClass}>Leave an empty line between paragraphs.</p>
      </div>

      <div>
        <label htmlFor="slug" className={labelClass}>
          Web address
        </label>
        <div className="mt-2 flex items-center overflow-hidden rounded-xl border border-navy-900/15 text-sm focus-within:border-navy-700">
          <span className="shrink-0 bg-navy-50 px-3 py-2.5 text-muted">/events/{series}/</span>
          <input
            id="slug"
            name="slug"
            defaultValue={event?.slug ?? ""}
            placeholder={date.slice(0, 4) || "2026"}
            className="min-w-0 flex-1 px-3 py-2.5 text-base focus:outline-none sm:text-sm"
          />
        </div>
        <p className={hintClass}>Leave blank to use the year.</p>
      </div>

      <label className="flex items-start gap-3 rounded-xl bg-navy-50 p-4">
        <input type="checkbox" name="published" defaultChecked={event?.published} className="mt-0.5 h-5 w-5 accent-leaf-600" />
        <span>
          <span className="block text-sm font-semibold text-navy-900">Published</span>
          <span className="block text-xs text-muted">Drafts are only visible to administrators.</span>
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? "Saving…" : event ? "Save changes" : "Create event"}
        </button>
        {state.error && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {state.error}
          </p>
        )}
        {state.message && (
          <p role="status" className="text-sm font-medium text-leaf-700">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
