import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Routes retired in the V4 redesign. Kept reachable so old links land
  // somewhere useful rather than on a 404.
  async redirects() {
    return [
      { source: "/clinic-technology", destination: "/treatments/dental-implants-surat/", permanent: true },
      { source: "/clinic-technology/", destination: "/treatments/dental-implants-surat/", permanent: true },
      { source: "/treatments/general-family-dentistry", destination: "/treatments/dental-check-up-surat/", permanent: true },
      { source: "/treatments/general-family-dentistry/", destination: "/treatments/dental-check-up-surat/", permanent: true },
    ];
  },
};

export default nextConfig;
