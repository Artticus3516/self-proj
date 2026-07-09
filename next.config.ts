import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify is true by default, but explicitly setting it to satisfy the directive
  swcMinify: true,
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache other static resources
        source: "/(.*\\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
