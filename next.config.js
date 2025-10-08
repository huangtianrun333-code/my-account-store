/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用严格的 ESLint 检查
  eslint: {
    ignoreDuringBuilds: false,
  },
  // 启用 TypeScript 检查
  typescript: {
    ignoreBuildErrors: false,
  },
  // 编译时忽略的警告
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 环境变量
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // 启用 SWC 最小化
  swcMinify: true,
}

module.exports = nextConfig