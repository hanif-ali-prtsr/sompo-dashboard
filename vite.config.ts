import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    assetsDir: ".",
    outDir: "build",
  },
  base: "/dashboard/",
  
  plugins: [react()],
});