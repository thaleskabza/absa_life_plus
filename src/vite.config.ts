import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Path resolution for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@ui': path.resolve(__dirname, './src/ui')
    }
  },

  // Development server optimized for mobile testing
  server: {
    port: 3000,
    host: '0.0.0.0', // Allows testing on mobile devices over network
    open: true,
    cors: true,
    hmr: {
      overlay: false // Prevent HMR overlay on mobile
    }
  },

  // Preview server for mobile testing
  preview: {
    port: 3000,
    host: '0.0.0.0',
    open: true
  },

  // Build optimizations for mobile performance
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2015', // Better mobile browser support
    
    rollupOptions: {
      output: {
        // Code splitting for better mobile loading
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['lodash'] // If you add lodash later
        },
        
        // Clean asset naming
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    },

    // Optimize for mobile bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    },

    // Increase chunk size warning limit for mobile
    chunkSizeWarningLimit: 1000
  },

  // CSS handling for mobile
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Add global SCSS variables if needed
        additionalData: `
          $mobile-breakpoint: 390px;
          $tablet-breakpoint: 768px;
          $desktop-breakpoint: 1024px;
        `
      }
    }
  },

  // Environment variables for mobile features
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __MOBILE_FORCE__: JSON.stringify(process.env.VITE_FORCE_MOBILE || 'false'),
    __API_BASE__: JSON.stringify(process.env.VITE_API_BASE || 'https://api.absa.co.za')
  },

  // PWA and mobile app features
  esbuild: {
    target: 'es2015',
    // Remove console in production for smaller bundle
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})