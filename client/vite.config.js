import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.docx', /\.docx$/],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
