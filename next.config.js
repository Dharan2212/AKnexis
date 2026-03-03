/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },

  eslint: {
    // Keep lint during build (recommended)
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig