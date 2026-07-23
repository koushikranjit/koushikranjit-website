import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: "/copytrading", destination: "/ea-trading", permanent: true },
      { source: "/copytrading/manage", destination: "/ea-trading/manage", permanent: true },
    ];
  },
};

export default nextConfig;
