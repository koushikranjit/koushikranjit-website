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
      { source: "/copytrading", destination: "/", permanent: true },
      { source: "/copytrading/manage", destination: "/", permanent: true },
      { source: "/ea-trading", destination: "/", permanent: true },
      { source: "/ea-trading/manage", destination: "/", permanent: true },
      { source: "/vps", destination: "/", permanent: true },
      { source: "/vps/manage", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
