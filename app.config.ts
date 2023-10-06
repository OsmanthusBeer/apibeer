export default defineAppConfig({
  // refs: https://ui.nuxt.com/getting-started/theming
  ui: {
    primary: 'black',
    gray: 'slate',
    container: {
      base: 'mx-auto',
      padding: 'px-4 py-6 pt-20',
      constrained: 'max-w-7xl',
    },
    header: {
    },
    // Default `black` theme
    safelistColors: ['black'],
    button: {
      default: {
        color: 'black',
      },
    },
  },
})
