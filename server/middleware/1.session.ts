import type { User } from '@prisma/client'
import type { SessionConfig } from 'h3'

declare module 'h3' {
  interface H3EventContext {
    session: Awaited<ReturnType<typeof useSession<User>>>
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
  const session = await useSession<User>(event, config)
  event.context.session = session as any
})
