import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      jsxRuntime: 'automatic', // Ensures optimized JSX transformation
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://tech-cart.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
    host: 'localhost', // Ensures Vite runs on localhost
    port: 5173, // Explicitly set port to avoid conflicts
    open: true, // Opens browser automatically
    hmr: {
      overlay: false, // Prevents full-page reload on errors
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext', // Ensures modern JavaScript output
    minify: 'esbuild', // Use esbuild for fast minification
  },
})
