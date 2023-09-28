/* eslint-disable node/prefer-global/process */

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (process.server) {
    // get server request session
    // eslint-disable-next-line no-console
    console.log('server')
    return
  }

  if (process.client) {
    // Skip if not required
    // if (to.meta.requiredAuth === false)
    //   return

    // Check authenticated
    // if (!session.value?.user) {
    //   const r = encodeURIComponent(to.fullPath)
    //   return navigateTo({ path: '/login', query: { r } })
    // }
  }
})
