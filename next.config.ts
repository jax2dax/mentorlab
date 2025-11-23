import type { NextConfig } from "next";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [{
        hostname:'img.clerk.com' //for user profile images from clerk
      }]
}
};

export default nextConfig;
