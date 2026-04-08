import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/krtrades', destination: '/KRtrades', permanent: true },
      { source: '/krtrades/:path*', destination: '/KRtrades/:path*', permanent: true },
      { source: '/Krtrades', destination: '/KRtrades', permanent: true },
      { source: '/Krtrades/:path*', destination: '/KRtrades/:path*', permanent: true },
    ]
  },
};

export default nextConfig;
