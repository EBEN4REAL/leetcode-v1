/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ["assets.leetcode.com", "leetcode.com", "https://leetcode.com"]
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leetcode.com',
        port: '',
        pathname: '/_next/static/images/**',
      },
    ],
  },
  transpilePackages: ['moedim']
}

module.exports = nextConfig
