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
          app: resolve(__dirname, 'src/app.ts'),
          home: resolve(__dirname, 'src/frontend/home/home.ts'),
          'theme-switcher': resolve(__dirname, 'src/dev/theme-switcher.ts')
        },
        output: {
          entryFileNames: `[name].${version}.js`,
          chunkFileNames: `[name].${version}.js`,
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            if (name.endsWith('.css')) {
              return `[name].${version}.css`;
            }
            return `assets/[name].${version}[extname]`;
          }
        }
      }
    }
  };
});
