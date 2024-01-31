/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL}/:path*`,
            },
        ]
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'na-static-images.s3.amazonaws.com',
                port: '',
                pathname: '/image/upload/**',
            },
        ],
    },
}

module.exports = nextConfig
