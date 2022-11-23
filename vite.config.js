import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: {
      key: "key.pem",
      cert: "cert.pem"
    },
    proxy: {
      // string shorthand
      // '/foo': 'http://localhost:4567',
      // with options
      '/api': {
        target: 'https://192.168.122.249:8998',
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
        // ssl: {
        //   pfx: "esauth.pfx",
        //   passphrase: "test"
        // }
      },
      // with RegEx
      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, '')
      // },
      // // Using the proxy instance
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy will be an instance of 'http-proxy'
      //   }
      // },
      // // Proxying websockets or socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:5173',
      //   ws: true
      // }
    }

  },
 
})
