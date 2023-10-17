import { $Enums } from '@prisma/client'
import { string, z } from 'zod'
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
      return projects
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
  // Team, TODO: permission
  teamList: protectedProcedure
    .query(async (event) => {
      const { ctx } = event
      const user = ctx.session.data.user
      const teams = await ctx.prisma.team.findMany({
        where: {
          AND: [
            { members: { some: { userId: user.id } } },
          ],
        },
      })
      return teams
    }),
  teamCreate: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(50),
        description: z.string().optional(),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const team = await ctx.prisma.team.create({
        data: {
          name: input.name,
          description: input.description,
          members: {
            create: {
              userId: user.id,
              role: $Enums.Role.Owner,
            },
          },
        },
      })
      return team
    }),
  teamShow: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const user = ctx.session.data.user
      const team = await ctx.prisma.team.findFirst({
        where: {
          id: input.id,
          members: { some: { userId: user.id } },
        },
      })
      if (!team)
        throw new Error('Project not found')
      return { ...team }
    }),
  teamDelete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const team = await ctx.prisma.team.delete({
        where: {
          id: input.id,
        },
      })
      return team
    }),
  teamMembers: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const res = await ctx.prisma.teamMember.findMany({
        where: {
          teamId: input.teamId,
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              avatar: true,
            },
          },
          role: true,
        },
      }) || []
      return res.map((item) => {
        return {
          ...item.user,
          role: item.role,
        }
      })
    }),
  // API, TODO: permission
  apiList: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        projectId: z.string().min(1),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      // const user = ctx.session.data.user
      const apis = await ctx.prisma.api.findMany({
        where: {
          AND: [
            { name: { contains: input?.name } },
            { projectId: input?.projectId },
          ],
        },
      })
      return apis
    }),
  apiCreate: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(50).optional(),
        description: z.string().min(3).max(255).optional(),
        endpoint: z.string(),
        method: z.nativeEnum($Enums.ApiMethod),
        params: z.object({}),
        body: z.object({}),
        headers: z.object({}),
        authorization: z.object({}),
        preRequestScript: z.string(),
        postResponseScript: z.string(),
        tags: z.array(string()),
        versions: z.array(string()),
        order: z.number(),
        status: z.nativeEnum($Enums.ApiStatus).optional(),
        projectId: z.string(),
      }),
    ).mutation(async (event) => {
      const { input, ctx } = event
      const { user } = ctx.session.data

      // Validate permission
      const projectMember = await ctx.prisma.projectMember.findFirst({
        where: {
          userId: user.id,
        },
      })
      if (!projectMember)
        throw new Error('Project not found')
      if (![
        $Enums.Role.Owner,
        $Enums.Role.Maintainer,
      ].includes(projectMember.role))
        throw new Error('Permission denied')

      const api = await ctx.prisma.api.create({
        data: {
          ...input,
        },
      })
      return api
    }),
  // Collection
  // TODO: permission
  collectionCreate: protectedProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
        name: z.string().min(1),
        pid: z.string().optional(),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const collection = await ctx.prisma.collection.create({
        data: {
          name: input.name,
          projectId: input.projectId,
          pid: input.pid,
          order: 0,
        },
      })
      return collection
    }),
  collectionList: protectedProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const collections = await ctx.prisma.collection.findMany({
        where: {
          projectId: input.projectId,
        },
      })
      return collections
    }),
  collectionUpdate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const collection = await ctx.prisma.collection.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      })
      return collection
    }),
  cololectionDelete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (event) => {
      const { input, ctx } = event
      const collection = await ctx.prisma.collection.delete({
        where: {
          id: input.id,
        },
      })
      return collection
    }),
})
