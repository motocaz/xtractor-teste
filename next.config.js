/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server external packages for react-pdf (ESM package)
  serverExternalPackages: ["react-pdf", "pdfjs-dist"],

  webpack: (config, { isServer }) => {
    // Handle react-pdf and canvas issues for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
        stream: false,
        util: false,
        url: false,
        os: false,
        crypto: false,
      };
    }

    // Externalize react-pdf for server-side to prevent SSR issues
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("react-pdf", "pdfjs-dist");

      // Add more aggressive externalization for problematic modules
      config.externals.push({
        "react-pdf": "commonjs react-pdf",
        "pdfjs-dist": "commonjs pdfjs-dist",
      });
    }

    return config;
  },
};

module.exports = nextConfig;
