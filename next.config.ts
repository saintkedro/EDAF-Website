import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { source: "/our-projects/tolerance-and-fair-play", destination: "/projects#tolerance-fair-play", permanent: true },    ];
  },
};

export default nextConfig;
