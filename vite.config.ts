import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger']
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      //'@components': path.resolve(__dirname, 'src/components'),
      //'@layouts': path.resolve(__dirname, 'src/components/layouts'),
      //'@assets': path.resolve(__dirname, 'src/assets'),
      //'@hooks': path.resolve(__dirname, 'src/lib/hooks'),
      //'@lib': path.resolve(__dirname, 'src/lib'),
      //'@helpers': path.resolve(__dirname, 'src/lib/helpers'),
      //'@types': path.resolve(__dirname, 'src/lib/types'),
      //'@services': path.resolve(__dirname, 'src/services'),
      //'@store': path.resolve(__dirname, 'src/lib/store'),
      //'@styles': path.resolve(__dirname, 'src/styles'),
      //'@icons': path.resolve(__dirname, 'src/components/icons'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**']
    }
  }
})
