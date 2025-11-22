import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['react-map-gl', 'mapbox-gl'],
  reactCompiler: true,
};

export default nextConfig;
