/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.leetcode.com", "leetcode.com"]
  },
  transpilePackages: ['moedim']
}

module.exports = nextConfig
