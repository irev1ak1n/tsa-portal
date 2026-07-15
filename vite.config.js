import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// host: true exposes the dev server on your local network,
// so you can open the app on your phone at http://<your-computer-ip>:5173
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
