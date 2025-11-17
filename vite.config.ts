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
      // This is the alias for your components
      "@": path.resolve(import.meta.dirname, "client/src"),
      
      // !! THIS IS THE FIX !!
      // This adds the missing alias for your images
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    },
  },

  build: {
    outDir: "../dist", // This is correct
    emptyOutDir: true,
  },
});
