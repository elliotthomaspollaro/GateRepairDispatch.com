import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ─── Performance ─── */
  poweredByHeader: false,
  compress: true,

  /* ─── Images ─── */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gaterepairdispatch.com",
      },
    ],
  },

  /* ─── Headers for security and caching ─── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
