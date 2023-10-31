import { $Enums } from '@prisma/client'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import type { ApiParams } from '@/types'

export const apiRouter = router({
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
        params: z.array(z.object({
          key: z.string(),
          type: z.enum(['string', 'number']),
          required: z.boolean(),
          description: z.string().optional(),
          example: z.string().optional(),
          scope: z.enum(['query', 'path']),
        }) satisfies z.ZodType<ApiParams>),
        body: z.object({}),
        headers: z.object({}),
        authorization: z.object({}),
        preRequestScript: z.string(),
        postResponseScript: z.string(),
        tags: z.array(z.string()),
        versions: z.array(z.string()),
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
  apiUpdate: protectedProcedure.input(
    z.object({
      id: z.string(),
      name: z.string().min(3).max(50).optional(),
      description: z.string().min(3).max(255).optional(),
      endpoint: z.string(),
      method: z.nativeEnum($Enums.ApiMethod),
      params: z.array(z.object({
        key: z.string(),
        type: z.enum(['string', 'number']),
        required: z.boolean(),
        description: z.string().optional(),
        example: z.string().optional(),
        scope: z.enum(['query', 'path']),
      }) satisfies z.ZodType<ApiParams>),
      body: z.object({}),
      headers: z.object({}),
      authorization: z.object({}),
      preRequestScript: z.string(),
      postResponseScript: z.string(),
      tags: z.array(z.string()),
      versions: z.array(z.string()),
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

    const api = await ctx.prisma.api.update({
      data: {
        ...input,
      },
      where: {
        id: input.id,
      },
    })
    return api
  }),
  apiGet: protectedProcedure
    .input(
      z.object({ id: z.string().min(1) }),
    )
    .query(async (event) => {
      const { input, ctx } = event
      const api = await ctx.prisma.api.findUnique({
        where: {
          id: input.id,
        },
      })
      if (!api)
        throw new Error('Api not found')

      return api
    }),
  apiDelete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    ).mutation(async (event) => {
      const { input, ctx } = event

      // TODO: Validate permission
      await ctx.prisma.api.delete({
        where: {
          id: input.id,
        },
      })
      return true
    }),
})
