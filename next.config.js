/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['framer-motion'],
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig; 