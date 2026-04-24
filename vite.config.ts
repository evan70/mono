import { defineConfig } from 'vite';
import { resolve } from 'path';
import neonTheme from '../themes/neon-theme/src/index';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
    build: {
      outDir: 'dist',
      server: {
        port: 4173,
        allowedHosts: ['.trycloudflare.com'],
      },
      manifest: 'vanilla-cards-manifest.json',
      rollupOptions: {
        input: {
          'index': resolve(__dirname, 'index.html'),
          'core-init': resolve(__dirname, 'src/init.ts'),
          'core-app': resolve(__dirname, 'src/app.ts'),
          'core-css': resolve(__dirname, 'src/css.ts'),
          'home': resolve(__dirname, 'src/frontend/home/home.ts'),
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
