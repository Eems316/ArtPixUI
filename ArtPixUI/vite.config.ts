import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.lib.json",
      entryRoot: "src",
      outDirs: "dist",
      clearPureImport: true,
      // Keep declarations for implemented components and skip the empty catalog stubs.
      beforeWriteFile: (_filePath, content) => {
        if (/^\s*(?:export\s*\{\s*\}\s*;?)?\s*$/.test(content)) return false;
      },
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "art-pix-ui",
      cssFileName: "art-pix-ui",
    },
    copyPublicDir: false,
    rolldownOptions: {
      external: (id) => /^(react|react-dom)(\/|$)/.test(id),
    },
  },
});
