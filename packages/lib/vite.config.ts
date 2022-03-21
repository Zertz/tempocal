/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "@tempocal/react",
      fileName: (format) => `tempocal-react.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
    },
  },
  plugins: [react()],
});
