/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/aem-proxy/:path*',
        destination: 'https://author-p117303-e1695777.adobeaemcloud.com/:path*',
      },
    ]
  },
};

export default nextConfig;
