import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const hiRouter = router({
  hi: publicProcedure.input(
    z.object({ text: z.string().nullish() }),
  ).query(({ input }) => {
    return {
      greeting: `hi ${input?.text ?? 'world'}`,
    }
  }),
})
