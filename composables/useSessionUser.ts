import type { SessionUser } from '~/types'

export function useSessionUser() {
  const _fetched = false
  const user = useState<SessionUser | null>('user', () => null)

  const { $client } = useNuxtApp()

  async function init({ force = false } = {}) {
    if (_fetched && !force)
      return user

    // Fetch user from session
    try {
      const { data } = await $client.protected.session.useQuery()
      user.value = data.value
    }
    catch (error) {
      console.warn(error)
      user.value = null
    }

    return user
  }

  return {
    init,
    user,
  }
}
