const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.ctfassets.net" },
      { hostname: "media.coaster.cloud" },
      { hostname: "cdn.coaster.cloud" },
    ],
    minimumCacheTTL: 2592000,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
