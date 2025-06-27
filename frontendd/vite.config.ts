import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/corposup/', // Replace 'corposup' with your GitHub repository name
  build: {
    outDir: '../dist' // Output to dist folder in root
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})