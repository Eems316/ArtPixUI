import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/ArtPixUI/",
  plugins: [react()],
  build: {
    outDir: "dist-playground",
    emptyOutDir: true,
  },
});
