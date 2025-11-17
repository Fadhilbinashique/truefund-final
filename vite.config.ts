import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react()
  ],
  
  // This tells Vite that your frontend code is in the "client" folder
  // Your screenshot (235104.png) confirms this is correct.
  root: "client", 

  resolve: {
    alias: {
      // This helps your app find files (e.g., "@" means "client/src")
      "@": path.resolve(import.meta.dirname, "client/src"),
    },
  },

  build: {
    // This tells Vite where to put the finished website.
    // It will put it in a "dist" folder at the top level (outside "client").
    outDir: "../dist",
    emptyOutDir: true,
  },
});