/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.ctfassets.net" },
      { hostname: "source.unsplash.com" },
    ],
    minimumCacheTTL: 86400
  },
};

module.exports = nextConfig;
