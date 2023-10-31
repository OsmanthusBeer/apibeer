import { mergeRouters, router } from '../trpc'
import { apiRouter } from './api'
import { collectionRouter } from './collection'
import { projectRouter } from './project'
import { publicRouter } from './public'
import { sessionRouter } from './session'
import { teamRouter } from './team'

export const appRouter = router({
  public: publicRouter,
  protected: mergeRouters(
    sessionRouter,
    teamRouter,
    projectRouter,
    collectionRouter,
    apiRouter,
  ),
})

export type AppRouter = typeof appRouter
