import type { SessionConfig } from 'h3'
import type { Session } from '~/types'

declare module 'h3' {
  interface H3EventContext {
    session: Awaited<ReturnType<typeof useSession<Session>>>
  }
}

const config: SessionConfig = {
  // TODO: load from .env, or `app.config.ts`
  password: 'ABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789',
  maxAge: 60 * 60 * 24 * 7, // 7 days
}

/**
 * Auth middleware session
 * refs: https://github.com/unjs/h3#session
 */
export default eventHandler(async (event) => {
  const session = await useSession<Session>(event, config)
  event.context.session = session as any
})
