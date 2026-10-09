import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel serve na raiz ("/"). Para GitHub Pages usa-se o nome do repositório (ver script "deploy").
  base: process.env.BASE_PATH ?? '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
