/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    //output: 'export',
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.sanity.io',
            },
        ],
    },
};

export default nextConfig;
