/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.ctfassets.net" },
      { hostname: "source.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
