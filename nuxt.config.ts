// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: 'logo_64x64.png',
      }],
    },
  },
  // Maping `.env` variables
  // refs: https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables
  runtimeConfig: {
    databaseUrl: '',
    public: {
      greeting: '',
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    // compilation: {
    //   jit: false,
    // },
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  devtools: { enabled: true },
})
