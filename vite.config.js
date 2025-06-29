import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './frontend', // Point to the frontend directory
  base: '/corposup/', // Replace 'corposup' with your GitHub repository name
  build: {
    outDir: '../dist', // Output to dist folder in root
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './frontend/src')
    }
  }
})
