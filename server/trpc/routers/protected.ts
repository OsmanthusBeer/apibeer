import { ProjectVisibility } from '@prisma/client'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const protectedRouter = router({
  session: protectedProcedure
    .query(async (event) => {
      const user = event.ctx.session.data.user
      return user
    }),
  logout: protectedProcedure
    .mutation(async (event) => {
      await event.ctx.session.clear()
    }),
  // TODO: pagination
  projectList: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        visibility: z.enum(['PUBLIC', 'PRIVATE']),
      })
        .optional(),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const projects = await ctx.prisma.project.findMany({
        where: {
          name: {
            contains: input?.name,
          },
          visibility: input?.visibility,
          OR: [
            { creatorId: ctx.session.data.user.id },
            { members: { some: { id: ctx.session.data.user.id } } },
          ],
        },
      })
      return projects
    }),
  projectCreate: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(50),
        description: z.string().min(3).max(255),
        visibility: z.enum([ProjectVisibility.PUBLIC, ProjectVisibility.PRIVATE]),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const project = await ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          visibility: input.visibility,
          creator: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      return project
    }),
})
