import { withPayload } from '@payloadcms/next/withPayload'
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "http" as const,
        hostname: "localhost",
      },
      {
        protocol: "http" as const,
        hostname: "127.0.0.1",
      },
    ]
  }
};

export default withPayload(nextConfig)