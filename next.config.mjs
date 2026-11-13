/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    // Lets the phone on the LAN load /_next/* dev assets; Next blocks unknown origins otherwise.
    allowedDevOrigins: ['192.168.0.105'],
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
