/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      new URL("https://minio-endpoint.bybxbwg.fun/*"),
      new URL("https://rustfs-endpoint.yhnotes.com/*"),
    ],
    minimumCacheTTL: 86400
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
