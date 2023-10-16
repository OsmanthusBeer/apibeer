import { HstNuxt } from '@histoire/plugin-nuxt'
import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

// refs: https://histoire.dev/guide/config.html
export default defineConfig({
  theme: {

  },
  plugins: [
    HstVue(),
    HstNuxt(),
  ],
})
