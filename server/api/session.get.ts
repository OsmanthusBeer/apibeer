/**
 * Return current session debugging
 * TODO: We should disable it in production environment
 */
export default defineEventHandler((event) => {
  return event.context.session
})
