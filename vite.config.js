import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const host = new URL("https://admin.tripbng.com").hostname;
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [host],
   }
})
