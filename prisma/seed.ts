/* eslint-disable no-console */
import process from 'node:process'
import { hash } from '~/server/utils/password'
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
      email: 'hi@apibeer.com',
      username: 'apibeer',
      password: {
        create: { hash: await hash('123456') },
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
