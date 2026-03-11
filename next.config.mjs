/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            new URL("https://rustfs-endpoint.yhnotes.com/*"),
        ],
        minimumCacheTTL: 0
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
