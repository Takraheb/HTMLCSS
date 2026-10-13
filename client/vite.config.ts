import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Sandbox note: the Base44 preview proxy reaches this dev server through
// `<port>-<sandbox id>.$BASE44_SANDBOX_HOST_DOMAIN`. Vite >= 6.1 appends the
// platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` value to
// `server.allowedHosts`, so the host check passes without loosening it here.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Single-origin wiring: the browser only ever talks to port 3000, and API
    // calls are proxied to the internal api service.
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET ?? 'http://api:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
