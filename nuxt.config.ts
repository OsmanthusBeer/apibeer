// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: 'logo_148x148.png',
      }],
    },
  },
  ui: {
    icons: ['mdi', 'simple-icons'],
  },
  // Maping `.env` variables
  // refs: https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables
  runtimeConfig: {
    databaseUrl: '',
    emailSmtp: '',
    public: {
      greeting: '',
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'vue-email/nuxt',
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
  vueEmail: {
    baseUrl: 'https://example.com',
    i18n: {
      defaultLocale: 'en',
      translations: {
        en: {
          greetings: 'Welcome {user}',
        },
        es: {
          greetings: 'Bienvenido {user}',
        },
      },
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  devtools: { enabled: true },
})
