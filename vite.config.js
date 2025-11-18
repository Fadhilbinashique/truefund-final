// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // The folder that contains index.html / src for the frontend
  root: "client",

  // Make assets use relative URLs (helps deployment)
  base: "./",

  plugins: [react()],

  // Build into the top-level dist/ folder so Vercel serves it
  build: {
    outDir: "../dist",   // write dist next to the repo root
    emptyOutDir: true
  }
});
