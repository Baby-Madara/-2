import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/meniclinic/',
    build: {
      outDir: path.resolve(__dirname, '../dist/meniclinic'),
      emptyOutDir: true,
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 5174,
      host: '0.0.0.0',
    },
  };
});
