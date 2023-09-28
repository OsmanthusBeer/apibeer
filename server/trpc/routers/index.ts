import { router } from '../trpc'
import { hiRouter } from './hi'
import { protectedRouter } from './protected'
import { publicRouter } from './public'

export const appRouter = router({
  hi: hiRouter,
  public: publicRouter,
  protected: protectedRouter,
})

export type AppRouter = typeof appRouter
