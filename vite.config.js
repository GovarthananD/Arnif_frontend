import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://arnif-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
