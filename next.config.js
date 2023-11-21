/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost", "studious-eureka-46475qqqwp4hjqqv-3001.app.github.dev"],
      allowedOrigins: ["studious-eureka-46475qqqwp4hjqqv-3001.app.github.dev", "localhost:3001"],
    },
  },
};

module.exports = nextConfig;
