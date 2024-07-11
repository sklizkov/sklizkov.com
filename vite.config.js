// import { resolve } from 'path'
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer';


export default defineConfig({
  build: {
		outDir: 'dist',
		emptyOutDir: true,
	},

	css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    }
  }
})
