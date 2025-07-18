import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Keep this if you want the /corposup/ prefix
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})