import type { NextConfig } from "next";

const supabaseHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qaanobvcfupakphzskfk.supabase.co").hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/our-projects/education", destination: "/projects/education", permanent: true },
      { source: "/our-projects/healthcare", destination: "/projects/healthcare", permanent: true },
      {
        source: "/our-projects/community-development",
        destination: "/projects/community-development",
        permanent: true,
      },
      { source: "/our-projects/english-for-all", destination: "/projects#micro-business-loan", permanent: true },
      { source: "/our-projects/literacy-development", destination: "/projects#youth-women", permanent: true },
      { source: "/our-projects/tolerance-and-fair-play", destination: "/projects#tolerance-fair-play", permanent: true },
    ];
  },
};

export default nextConfig;
