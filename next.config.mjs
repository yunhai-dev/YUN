/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [new URL("https://minio-endpoint.bybxbwg.fun/*")],
    minimumCacheTTL: 2678400
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
