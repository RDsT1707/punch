import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/punch/', // <-- le nom de ton repo GitHub ici
  plugins: [react()],
});