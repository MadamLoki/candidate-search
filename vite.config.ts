import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    strictPort: true
  },
  preview: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    strictPort: true
  }
});