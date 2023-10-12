/* eslint-disable no-console */
import process from 'node:process'
import { getGravatarURL } from '~/server/utils/gavatar'
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
  // Default User
  const email = 'hi@apibeer.com'
  const username = 'apibeer'
  const password = '123456'
  try {
    await prisma.user.upsert({
      where: {
        email: 'hi@apibeer.com',
      },
      update: {
        email,
        username,
        avatar: getGravatarURL(email),
        password: {
          update: { hash: await hash(password) },
        },
      },
      create: {
        email,
        username,
        avatar: getGravatarURL(email),
        password: {
          create: { hash: await hash(password) },
        },
      },
    })
  }
  catch (error) {
    // Maybe exist
    console.log(error)
  }
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
