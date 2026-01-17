import { withPayload } from '@payloadcms/next/withPayload'
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "**.googleusercontent.com",
      }
    ]
  }
};

export default withPayload(nextConfig)