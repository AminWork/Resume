import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Increase memory limit and optimize build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '3d-force-graph'],
          ui: ['lucide-react', 'swiper']
        }
      }
    },
    // Reduce memory usage
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (optional)
    sourcemap: false,
  },
});
