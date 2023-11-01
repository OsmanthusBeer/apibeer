import { Icon } from '@iconify/vue'

// mdi icon: https:// icon-sets.iconify.design/mdi/clipboard-text-clock/
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Icon', Icon)
})
