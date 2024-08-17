// import devtools from 'solid-devtools/vite';
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  base: '/arriba/',
  plugins: [
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
