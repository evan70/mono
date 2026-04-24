import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
const version = pkg.version;

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    base: './',
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
      manifest: 'vanilla-cards-manifest.json',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          init: resolve(__dirname, 'src/init.ts'),
          'core-app': resolve(__dirname, 'src/app.ts'),
          'core-css': resolve(__dirname, 'src/css.ts'),
          home: resolve(__dirname, 'src/frontend/home/home.ts'),
          'theme-switcher': resolve(__dirname, 'src/dev/theme-switcher.ts')
        },
        output: {
          entryFileNames: `[name].[hash].js`,
          chunkFileNames: `[name].[hash].js`,
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            if (name.endsWith('.css')) {
              return `[name].[hash].css`;
            }
            return `assets/[name].[hash][extname]`;
          }
        }
      }
    }
  };
});
