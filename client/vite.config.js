import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\//, '')
      },
      "/api/v1/auth/login": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\//, '')
      },
      "/api/v1/auth/check-auth": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\//, '')
      },
      "/api/v1/auth/logout": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\//, '')
      },

    }
  }
})
