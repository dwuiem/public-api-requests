import { defineConfig } from 'vite'

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        weather: 'weather.html',
        currency: 'currency.html',
        dogs: 'dogs.html'
      }
    }
  }
})
