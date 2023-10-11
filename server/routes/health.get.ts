import { format } from '@lukeed/ms'
import packageJSON from '~/package.json'

const uptime = Date.now()

export default defineEventHandler(async (event) => {
  const db = await (async function () {
    try {
      await event.context.prisma.$connect()
      return 'connected'
    }
    catch {
      return 'disconnected'
    }
    finally {
      await event.context.prisma.$disconnect()
    }
  })()

  return {
    uptime: format(Date.now() - uptime),
    version: packageJSON.version,
    db,
  }
})
