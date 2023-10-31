import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const collectionRouter = router({
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
  collectionDelete: protectedProcedure
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
