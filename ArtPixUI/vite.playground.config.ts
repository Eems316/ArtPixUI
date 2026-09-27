import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/ArtPixUI/",
  plugins: [react()],
  build: {
    cssTarget: ["chrome61", "safari12"],
    outDir: "dist-playground",
    emptyOutDir: true,
  },
});
