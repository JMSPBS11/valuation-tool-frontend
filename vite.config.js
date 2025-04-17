import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure Vite starts from root
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
