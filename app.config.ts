const container = {
  base: 'mx-auto',
  padding: 'px-4 py-6 pt-20',
  constrained: 'max-w-7xl',
}

const header = {
}

export default defineAppConfig({
  // TODO: Change to black theme
  ui: {
    primary: 'white',
    gray: 'cool',
    container,
    header,
  },
})
