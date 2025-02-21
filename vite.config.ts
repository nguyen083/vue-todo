import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
    Components({
      dirs: ['src/components'], // Thư mục chứa component
      extensions: ['vue'],
      deep: true, // Quét thư mục con
      dts: 'src/components.d.ts', // Tạo file khai báo TypeScript
      resolvers: [VueUseComponentsResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
