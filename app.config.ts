export default defineAppConfig({
  // refs: https://ui.nuxt.com/getting-started/theming
  ui: {
    primary: 'orange',
    gray: 'slate',
    container: {
      base: 'mx-auto',
      constrained: 'max-w-full',
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
