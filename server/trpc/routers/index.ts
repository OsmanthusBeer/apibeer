import { router } from '../trpc'
import { authRouter } from './auth'
import { hiRouter } from './hi'

export const appRouter = router({
  hi: hiRouter,
  auth: authRouter,
})

export type AppRouter = typeof appRouter
