import type { NextConfig } from "next";

// Static export for GitHub Pages. The Pages workflow sets PAGES_BASE_PATH to the repo
// subpath (/two-men-bagel-house); locally it is empty and the site serves from /.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  // Pages has no image optimiser; the loader only adds the base path to each src
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
