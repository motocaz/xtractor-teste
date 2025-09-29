/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14+ automatically detects src/app directory
  webpack: (config, { isServer }) => {
    // Handle react-pdf and canvas issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
      };
    }

    // Ignore pdfjs-dist worker on server-side
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("pdfjs-dist");
    }

    return config;
  },
};

module.exports = nextConfig;
