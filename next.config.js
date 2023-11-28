/** @type {import('next').NextConfig} */

// @ts-ignore
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false, // process.env.NODE_ENV === "development",
  swcMinify: true,
  // workboxOptions: { swSrc: "/worker/index.ts" },
});

const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: [
        "localhost",
        "studious-eureka-46475qqqwp4hjqqv-3000.app.github.dev",
      ],
      allowedOrigins: [
        "studious-eureka-46475qqqwp4hjqqv-3000.app.github.dev",
        "localhost:3000",
      ],
    },
  },
};

module.exports = withPWA(nextConfig);
