import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import postcssConfigCjs from "./postcss.config.cjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3001,
  },
  css: {
    postcss: postcssConfigCjs,
  },
  build: {
    manifest: true,
  },
  rollupOptions: {
    output: {
      entryFileNames: "assets/svelte-app-[name].js",
      chunkFileNames: "assets/svelte-app-[name].js",
      assetFileNames: "assets/svelte-app-[name].[ext]",
    },
  },
});
