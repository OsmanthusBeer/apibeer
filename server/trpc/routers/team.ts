import { $Enums } from '@prisma/client'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const teamRouter = router({
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
})
