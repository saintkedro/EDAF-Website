export type ParsedVideo =
  | { provider: "youtube"; id: string; embedUrl: string; thumbnail: string }
  | { provider: "facebook"; embedUrl: string };

const YOUTUBE_ID = /^[\w-]{11}$/;

export function parseVideoUrl(input: string): ParsedVideo | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www\.|m\.)/, "");

  let youtubeId: string | null = null;
  if (host === "youtu.be") youtubeId = url.pathname.slice(1).split("/")[0];
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const [, first, second] = url.pathname.split("/");
    youtubeId = first === "watch" ? url.searchParams.get("v") : ["embed", "shorts", "live"].includes(first) ? second : null;
  }
  if (youtubeId && YOUTUBE_ID.test(youtubeId)) {
    return {
      provider: "youtube",
      id: youtubeId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`,
      thumbnail: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  if (host === "facebook.com" || host === "fb.watch") {
    return {
      provider: "facebook",
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url.toString())}&show_text=false&autoplay=true`,
    };
  }

  return null;
}
