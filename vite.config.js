//vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        minify: 'esbuild', // Use esbuild instead of terser (faster and built-in)
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom']
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': '/src',
            '@/components': '/src/components',
            '@/pages': '/src/pages',
            '@/ui': '/src/ui'
        }
    }
});
