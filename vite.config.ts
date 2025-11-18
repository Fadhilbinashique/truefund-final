// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',           // ← ADD this line
  plugins: [react()],
  // keep any other options you already had
})
