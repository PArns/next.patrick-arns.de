/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.ctfassets.net" },
      { hostname: "media.coaster.cloud" },
    ],
    minimumCacheTTL: 2592000,
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
