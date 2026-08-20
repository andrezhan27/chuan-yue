import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/menu",
        destination: "/menu/chuan-yue-menu.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
