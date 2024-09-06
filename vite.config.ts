import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/nms-crafting-trees/',
	build: {
		outDir: 'docs'
	},
  plugins: [vue()],
})
