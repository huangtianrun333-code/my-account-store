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
  // 移除有问题的 env 配置
  // swc 最小化
  swcMinify: true,
}

module.exports = nextConfig