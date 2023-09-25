import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '~/server/db'

export const appRouter = router({
  hi: publicProcedure.input(
    z.object({ text: z.string().nullish() }),
  ).query(({ input }) => {
    return {
      greeting: `hi ${input?.text ?? 'world'}`,
    }
  }),
  login: publicProcedure.input(
    z.object({
      email: z.string().email('invalid email'),
      password: z.string().min(6),
    }),
  ).mutation(async ({ input }) => {
    // TODO: implement login
    const user = prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })
    if (!user)
      throw new Error('invalid credentials')

    return user
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
