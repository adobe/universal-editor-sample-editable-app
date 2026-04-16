import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react(), basicSsl()],
    base: '/',
    server: {
      https: true,
      port: 3000,
      cors: {
        origin: 'https://experience.adobe.com',
        // This allows the private network access preflight
        privateNetworkAccess: true 
      },
      // Alternative method if the above doesn't apply:
      headers: {
        'Access-Control-Allow-Origin': 'https://experience.adobe.com',
        'Access-Control-Allow-Private-Network': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }
  }
})
