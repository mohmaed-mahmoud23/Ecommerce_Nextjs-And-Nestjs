import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/*",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-categories/*",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-brands/*",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // <-- ده اللي يخلي الـ build ينجح حتى لو فيه أخطاء ESLint
  },
};

export default nextConfig;
