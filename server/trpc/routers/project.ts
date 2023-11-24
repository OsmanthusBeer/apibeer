import { $Enums } from '@prisma/client'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const projectRouter = router({
  userList: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        keyword: z.string(),
      }),
    )
    .query(async (event) => {
      const { ctx, input } = event
      const users = await ctx.prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  username: {
                    contains: input.keyword,
                  },
                },
                {
                  email: {
                    contains: input.keyword,
                  },
                },
              ],
            },
            {
              NOT: {
                TeamMember: {
                  some: {
                    teamId: input.teamId,
                  },
                },
              },
            },
          ],
        },
      })
      return users
    }),
  // TODO: pagination
  projectList: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        teamId: z.string(),
        visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const projects = await ctx.prisma.project.findMany({
        where: {
          AND: [
            { name: { contains: input?.name } },
            { teamId: input?.teamId },
            { visibility: input?.visibility },
            { members: { some: { userId: user.id } } },
          ],
        },
      })

      const list = []
      for (const project of projects) {
        const res = await ctx.prisma.projectCollection.findFirst({
          where: {
            AND: [
              { projectId: project.id },
              { userId: user?.id },
            ],
          },
        })
        list.push({
          ...project,
          isFavorite: !!res,
        })
      }

      return list
    }),
  projectCreate: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(50),
        description: z.string().min(3).max(255),
        teamId: z.string(),
        visibility: z.nativeEnum($Enums.ProjectVisibility),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const project = await ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          teamId: input.teamId,
          visibility: input.visibility,
          members: {
            create: {
              userId: user.id,
              role: $Enums.Role.Owner,
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
          members: { some: { userId: user.id } },
        },
      })
      if (!project)
        throw new Error('Project not found')
      // add or update visted history

      const visitedRecord = await ctx.prisma.visitedHisotry.findFirst({
        where: {
          projectId: input.id,
          userId: user.id,
        },
      })
      if (visitedRecord) {
        await ctx.prisma.visitedHisotry.update({
          where: {
            id: visitedRecord.id,
          },
          data: {
            date: new Date().getTime().toString(),
          },
        })
      }
      else {
        await ctx.prisma.visitedHisotry.create({
          data: {
            projectId: input.id,
            userId: user.id,
            date: new Date().getTime().toString(),
          },
        })
      }

      return { ...project, visibility: project.visibility.toLowerCase() }
    }),
  projectUpdate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3).max(50),
        description: z.string().min(3).max(255),
        visibility: z.nativeEnum($Enums.ProjectVisibility),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const existed = await ctx.prisma.project.update({
        where: {
          id: input.id,
          members: { some: { userId: user.id, role: $Enums.Role.Owner } },
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
          members: { some: { userId: user.id, role: $Enums.Role.Owner } },
        },
      })
      if (!existed)
        throw new Error('Project not found')

      return true
    }),
  visitedList: protectedProcedure
    .query(async (event) => {
      const { ctx } = event
      const user = ctx.session.data.user
      const visitedList = await ctx.prisma.visitedHisotry.findMany({
        where: {
          userId: user.id,
        },
        include: {
          project: true,
        },
        orderBy: {
          date: 'desc',
        },
      })
      return visitedList
    }),
  addFavoriteProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async (event) => {
      const { ctx, input } = event
      const user = ctx.session.data.user
      const res = await ctx.prisma.projectCollection.create({
        data: {
          userId: user.id,
          projectId: input.projectId,
        },
      })
      return res
    }),
  removeFavoriteProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async (event) => {
      const { ctx, input } = event
      const user = ctx.session.data.user
      const res = await ctx.prisma.projectCollection.deleteMany({
        where: {
          userId: user.id,
          projectId: input.projectId,
        },
      })
      return res
    }),
})
