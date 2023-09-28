import { router } from '../trpc'
import { hiRouter } from './hi'
import { publicRouter } from './public'

export const appRouter = router({
  hi: hiRouter,
  public: publicRouter,
})

export type AppRouter = typeof appRouter
