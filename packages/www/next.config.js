/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "export",
  distDir: "dist",
  transpilePackages: ["@tempocal/core", "@tempocal/react"],
  reactStrictMode: true,
};
