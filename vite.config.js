import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.', // root of your project
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'public/index.html')
    },
    outDir: 'dist',
    emptyOutDir: true
  }
})