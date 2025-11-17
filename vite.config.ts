import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react()
  ],
  
  root: "client", // This is correct

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      
      // !! THIS IS THE FINAL FIX !!
      // This tells Vite what '@server' means.
      "@server": path.resolve(import.meta.dirname, "server")
    },
  },

  build: {
    outDir: "../dist", // This is correct
    emptyOutDir: true,
  },
});
