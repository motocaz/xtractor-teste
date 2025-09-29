/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server external packages for react-pdf (ESM package)
  serverExternalPackages: ["react-pdf", "pdfjs-dist"],

  // Disable static optimization for pages that use react-pdf
  trailingSlash: false,

  // Add transpile packages for better ESM handling
  transpilePackages: [],

  // Disable static optimization for pages that might use react-pdf
  output: "standalone",

  webpack: (config, { isServer, webpack }) => {
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
        buffer: false,
        process: false,
        __dirname: false,
        __filename: false,
      };
    }

    // Externalize react-pdf for server-side to prevent SSR issues
    if (isServer) {
      config.externals = config.externals || [];

      // More comprehensive externalization
      config.externals.push("react-pdf", "pdfjs-dist", {
        "react-pdf": "commonjs react-pdf",
        "pdfjs-dist": "commonjs pdfjs-dist",
      });

      // Add webpack ignore plugin for problematic modules
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^canvas$/,
          contextRegExp: /pdfjs-dist/,
        })
      );

      // Add more aggressive ignore patterns
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^fs$/,
          contextRegExp: /pdfjs-dist/,
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
