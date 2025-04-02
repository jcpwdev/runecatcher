import { defineConfig } from 'vite'

export default defineConfig({
   build: {
       minify: "terser",
       terserOptions: {
           keep_classnames: true
       }
   }
})