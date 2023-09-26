export default defineI18nConfig(() => ({
  // refs: https://v8.i18n.nuxtjs.org/getting-started/basic-usage
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome to Api Beer',
    },
    cn: {
      welcome: '欢迎来到 Api Beer',
    },
  },
}))
