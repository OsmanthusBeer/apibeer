import process from 'node:process'
import type { Role } from '@prisma/client'
import { $Enums, InviteStatus } from '@prisma/client'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { protectedProcedure, router } from '../trpc'
import { useCompiler } from '#vue-email'
import { generateUUID } from '~/server/utils/uuid'

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
              status: $Enums.InviteStatus.Success,
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
          status: true,
          role: true,
        },
      }) || []
      return res.map((item) => {
        return {
          ...item.user,
          role: item.role,
          status: item.status,
        }
      })
    }),
  teamInvite: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        userIds: z.array(z.string()),
        role: z.string(),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const data = input.userIds.map((userId) => {
        return {
          id: generateUUID(),
          userId,
          role: input.role as Role,
          teamId: input.teamId,
          status: $Enums.InviteStatus.Pending,
        }
      })
      // insert into team member record
      const res = await ctx.prisma.teamMember.createMany({
        data,
      })

      // send email
      data.forEach(async (item) => {
        const template = await useCompiler('teamInvite.vue', {
          props: {
            id: '',
            confirmUrl: `http://localhost:3000/dashboard/t/confirm?id=${item.id}`,
          },
        })

        const transporter = nodemailer.createTransport({
          host: 'smtp.exmail.qq.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env?.NUXT_EMAIL_ACCOUNT,
            pass: process.env?.NUXT_EMAIL_PASSPORT,
          },
        })

        await transporter.sendMail({
          from: '"OsmanthusBeer Labs🌹" <yule@eansoft.net>', // sender address
          to: '1679591098@qq.com', // list of receivers
          subject: 'OsmanthusBeer Labs: Team invite', // Subject line
          html: template, // html body
        })
      })

      return res
    }),
  teamMemberShow: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const teamMember = await ctx.prisma.teamMember.findFirst({
        where: {
          id: input.id,
        },
      })
      if (!teamMember)
        throw new Error('teamMember not found')
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: teamMember.userId,
        },
      })
      const team = await ctx.prisma.team.findFirst({
        where: {
          id: teamMember.teamId,
        },
      })

      return { ...teamMember, username: user?.username, teamname: team?.name }
    }),

  teamInviteConfirm: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const res = await ctx.prisma.teamMember.update({
        where: {
          id: input.id,
        },
        data: {
          status: InviteStatus.Success,
        },
      })

      return res
    }),
})
