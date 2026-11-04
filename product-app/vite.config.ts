import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The API's CORS policy (AllowedOrigins) only trusts this port, so fail
    // loudly instead of silently moving to 5174 when it's taken.
    port: 5173,
    strictPort: true,
  },
})
