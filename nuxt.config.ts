// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
    // compilation: {
    //   jit: false,
    // },
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  app: {
    head: {
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: 'logo_64x64.png',
      }],
    },
  },
  devtools: { enabled: true },
})
