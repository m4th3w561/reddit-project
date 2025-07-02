/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all hosts, adjust as needed for security
      },
    ],
  },
};

export default nextConfig;
