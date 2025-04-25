/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false
  },
  // Make the images directory accessible as a static asset
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/images/:path*',
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    })
    return config
  }
}

module.exports = nextConfig 