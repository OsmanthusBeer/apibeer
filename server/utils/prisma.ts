import process from 'node:process'
import { PrismaClient } from '@prisma/client'

function prismaClientSingleton(): PrismaClient {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
