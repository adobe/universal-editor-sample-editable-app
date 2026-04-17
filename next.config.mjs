/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    debugger;
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://experience.adobe.com" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS, PUT, PATCH, DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With" },
          // CRITICAL: This allows a public site to access your local network
          { key: "Access-Control-Allow-Private-Network", value: "true" },
        ],
      },
    ]
  }
};

export default nextConfig;
