/* eslint-disable no-console */
import process from 'node:process'
import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'

async function seed() {
  console.log('🌱 Seeding...')
  console.time('🌱 Database has been seeded')

  await seedUsers()

  console.timeEnd('🌱 Database has been seeded')
}

async function seedUsers() {
  console.time('🔑 Created users...')
  // TODO: skip exist
  await prisma.user.create({
    data: {
      username: 'apibeer',
      email: 'hi@apibeer.com',
      password: {
        create: { hash: await bcrypt.hash('123456', 10) },
      },
    },
  })
  console.timeEnd('🔑 Created users...')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
