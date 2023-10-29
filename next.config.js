/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.edgestore.dev'],
  },
  // port config
  // port: 3000,
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
