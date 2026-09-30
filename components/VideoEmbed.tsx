"use client";

import Image from "next/image";
import { useState } from "react";
import { parseVideoUrl } from "@/lib/video";

export default function VideoEmbed({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const video = parseVideoUrl(url);

  if (!video) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid aspect-video place-items-center rounded-2xl bg-navy-900 p-6 text-center text-sm font-semibold text-white hover:bg-navy-800"
      >
        Watch the video <span aria-hidden>&rarr;</span>
      </a>
    );
  }

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
        <iframe
          src={video.embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-navy-900 text-left"
      aria-label={`Play video: ${title}`}
    >
      {video.provider === "youtube" ? (
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
      ) : (
        <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
      )}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-navy-900 shadow-lg transition-transform group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-sm font-medium text-white">
        {video.provider === "facebook" ? "Facebook video" : "YouTube video"}
      </span>
    </button>
  );
}
