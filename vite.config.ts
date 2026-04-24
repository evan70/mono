import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [
      {
        name: 'html-transform',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/' || req.url === '/index.html') {
              req.url = '/vite-entry.html';
            }
            next();
          });
        },
      },
    ],
    server: {
      allowedHosts: true,
      port: 5173,
    },
    preview: {
      allowedHosts: true,
      port: 4173,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      manifest: 'vanilla-cards-manifest.json',
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'vite-entry.html'),
          init: resolve(__dirname, 'src/init.ts'),
          'core-app': resolve(__dirname, 'src/app.ts'),
          'core-css': resolve(__dirname, 'src/css.ts'),
          home: resolve(__dirname, 'src/frontend/home/home.ts'),
          'theme-switcher': resolve(__dirname, 'src/dev/theme-switcher.ts')
        },
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            if (name.endsWith('.css')) {
              return `[name].css`;
            }
            return `assets/[name][extname]`;
          }
        }
      }
    }
  };
});
