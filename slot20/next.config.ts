import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.dummyjson.com' }],
  },
};

export default nextConfig;
