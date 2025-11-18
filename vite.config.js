// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"), // client has index.html + src
  base: "./",                               // use relative asset paths
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@server": path.resolve(__dirname, "server") // if you need it
    }
  },
  build: {
    outDir: path.resolve(__dirname, "dist"), // output to repo-root/dist
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "client", "index.html")
    }
  }
});
