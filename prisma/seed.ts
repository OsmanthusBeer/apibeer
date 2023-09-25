/* eslint-disable no-console */
import process from 'node:process'
import type { Prisma } from '@prisma/client'
import { prisma } from '~/server/db'

async function seed() {
  console.log('🌱 Seeding...')
  console.time('🌱 Database has been seeded')

  console.time('🔑 Created users...')
  const users: Prisma.UserCreateInput [] = [
    { username: 'is.yuler', email: 'is.yuler@gmail.com' },
  ]
  await prisma.user.createMany({ data: users })
  console.timeEnd('🔑 Created users...')

  console.timeEnd('🌱 Database has been seeded')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
