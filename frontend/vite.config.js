import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // чтобы было доступно снаружи Docker
    port: 3000, // или 5173 если не хочешь менять
    proxy: {
      '/accounts': 'http://backend:8000',
      '/events': 'http://backend:8000',
      '/oauth': 'http://backend:8000',
      // Swagger, если нужно:
      '/swagger': 'http://backend:8000',
    }
  },
  build: {
    outDir: '../backend/frontend/dist',
    emptyOutDir: true,
  },
  base: "/",
})