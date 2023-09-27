import type { User } from '@prisma/client'
import type { Session } from '@sidebase/nuxt-session'
import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(event: H3Event) {
  /**
   * Add any trpc-request context here. E.g., you could add `prisma` like this (if you've added it via sidebase):
   * ```ts
   * return { prisma: _event.context.prisma }
   * ```
   */
  return {
    prisma: event.context.prisma,
    session: event.context.session as Session & { user?: User },
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
