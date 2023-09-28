import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const publicRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email('invalid email'),
        password: z.string().min(6),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      // TODO: implement login
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      // TODO: Wrap trpc error
      if (!user)
        throw new Error('invalid credentials')

      // Storge session
      await ctx.session.update(user)

      return user
    }),
})
