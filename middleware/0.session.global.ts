/* eslint-disable node/prefer-global/process */
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { init, user } = useSessionUser()
  await init()

  // Skip if not required
  if (to.meta.requiredAuth === false)
    return

  // Check authenticated
  if (!user.value) {
    const r = encodeURIComponent(to.fullPath)
    return navigateTo({ path: '/login', query: { r } })
  }
})
