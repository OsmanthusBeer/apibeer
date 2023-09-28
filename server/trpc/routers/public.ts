import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { verify } from '~/server/utils/password'

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
        select: {
          id: true,
          email: true,
          username: true,
          password: { select: { hash: true } },
        },
      })

      // TODO: Wrap unified error
      if (!user)
        throw new Error('invalid credentials')

      // TODO: Skip some env like: (DEMO, Development)
      if (!await verify(input.password, user.password!.hash))
        throw new Error('invalid credentials')

      // Storge session
      await ctx.session.update({ user })

      return user
    }),
})
