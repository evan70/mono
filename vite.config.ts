import { defineConfig } from 'vite';
import { resolve } from 'path';
import neonTheme from '@nativa/theme-neon';

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
          'index': resolve(__dirname, 'index.html'),
          'core-app': resolve(__dirname, 'src/app.ts'),
          'neon-theme': resolve(__dirname, 'src/dev/theme-switcher.ts')
        },
        output: {
          entryFileNames: '[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return isProd ? '[name].[hash].css' : '[name].css';
            }
            return 'assets/[name].[hash][extname]';
          }
        }
      }
    }
  };
});
