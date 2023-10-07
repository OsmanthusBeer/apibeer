export default defineAppConfig({
  // refs: https://ui.nuxt.com/getting-started/theming
  ui: {
    primary: 'custom',
    gray: 'zinc',
    container: {
      base: 'mx-auto',
      constrained: 'max-w-full',
    },
    header: {
    },
    // Default `black` theme
    safelistColors: ['custom', 'zinc'],
    button: {
      default: {
        color: 'black',
      },
    },
  },
})
