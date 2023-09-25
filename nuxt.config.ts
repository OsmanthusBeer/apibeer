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
  modules: ['@nuxt/ui'],
  devtools: { enabled: true },
})
