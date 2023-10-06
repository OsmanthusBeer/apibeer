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
  projectShow: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const project = await ctx.prisma.project.findFirst({
        where: {
          id: input.id,
          OR: [
            { creatorId: user.id },
            { members: { some: { id: user.id } } },
          ],
        },
      })
      if (!project)
        throw new Error('Project not found')

      return { ...project, visibility: project.visibility.toLowerCase() }
    }),
  projectDelete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    ).mutation(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const existed = await ctx.prisma.project.delete({
        where: {
          id: input.id,
          creatorId: user.id,
        },
      })
      if (!existed)
        throw new Error('Project not found')

      return true
    }),
  projectUpdate: protectedProcedure
    .input((
      z.object({
        id: z.string(),
        name: z.string().min(3).max(50),
        description: z.string().min(3).max(255),
        visibility: z.enum([ProjectVisibility.PUBLIC, ProjectVisibility.PRIVATE]),
      })
    ))
    .mutation(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const existed = await ctx.prisma.project.update({
        where: {
          id: input.id,
          creatorId: user.id,
        },
        data: {
          name: input.name,
          description: input.description,
          visibility: input.visibility,
        },
      })
      if (!existed)
        throw new Error('Project not found')

      return true
    }),
})
