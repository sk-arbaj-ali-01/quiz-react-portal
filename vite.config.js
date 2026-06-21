import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Intercept any request starting with /api
      '/api': {
        target: 'https://localhost:7087', // Your .NET backend URL
        changeOrigin: true,
        secure: false, // Set to false if using self-signed local certs
      }
    }
  }
})
