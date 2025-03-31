import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  rewrites: async () => [
    {
      source: "/setyadi-api/:path*",
      destination: `${
        process.env.API_BASE_URL || "http://localhost:8000"
      }/:path*`,
    },
  ],
};

export default nextConfig;
