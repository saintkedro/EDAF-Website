"use client";

import { useState } from "react";
import PhotoLightboxGrid, { type LightboxPhoto } from "@/components/PhotoLightboxGrid";
import VideoEmbed from "@/components/VideoEmbed";

export type GalleryCategory = { id: string; label: string };
export type GalleryPhoto = LightboxPhoto & { category: string; year?: string };
export type GalleryVideo = { id: string; url: string; title: string; caption?: string | null; category: string; year?: string };

export default function GalleryBrowser({
  categories,
  photos,
  videos,
}: {
  categories: GalleryCategory[];
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
}) {
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");

  const available = categories.filter((c) => [...photos, ...videos].some((item) => item.category === c.id));
  const years = [...new Set([...photos, ...videos].map((item) => item.year).filter(Boolean) as string[])].sort().reverse();
  const matches = (item: { category: string; year?: string }) =>
    (category === "all" || item.category === category) && (year === "all" || item.year === year);
  const shownPhotos = photos.filter(matches);
  const shownVideos = videos.filter(matches);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter by event" className={`flex flex-wrap gap-2 ${available.length < 2 ? "hidden" : ""}`}>
          {[{ id: "all", label: "All" }, ...available].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
                category === c.id ? "bg-navy-800 text-white" : "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        {years.length > 1 && (
          <label className="flex items-center gap-3 text-sm font-medium text-navy-900">
            Year
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="min-h-11 rounded-full border border-navy-900/15 bg-white px-4 text-base sm:text-sm"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {shownVideos.length > 0 && (
        <section className="mt-10">
          <h2 className="font-semibold tracking-tight text-2xl text-navy-900">Videos</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shownVideos.map((v) => (
              <figure key={v.id}>
                <VideoEmbed url={v.url} title={v.title} />
                <figcaption className="mt-2 text-sm text-muted">{v.caption || v.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        {shownVideos.length > 0 && <h2 className="mb-6 font-semibold tracking-tight text-2xl text-navy-900">Photos</h2>}
        {shownPhotos.length > 0 ? (
          <PhotoLightboxGrid key={`${category}-${year}`} photos={shownPhotos} />
        ) : (
          <p className="rounded-2xl border border-dashed border-navy-900/20 bg-white px-6 py-12 text-center text-sm text-muted">
            No photos match this filter yet.
          </p>
        )}
      </section>
    </div>
  );
}
