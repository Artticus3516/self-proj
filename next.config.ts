import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
        allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
    },
};

export default nextConfig;
