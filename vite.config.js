import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // optional but harmless
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
