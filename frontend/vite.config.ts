import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsNode from 'ts-node';

// Enable ts-node to process postcss.config.ts
tsNode.register();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  }
});
