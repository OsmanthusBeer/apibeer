import { z } from 'zod'

const schema = z.object({
  page: z.coerce.number().min(1),
  limit: z.coerce.number().min(1),
}).partial()
type Schema = z.output<typeof schema>

export default defineEventHandler(async (event) => {
  // pagination
  let query = getQuery<Schema>(event)
  try {
    query = schema.parse(query)
  }
  catch (error) {
    throwError(error)
  }
  const { page = 1, limit = 20 } = query
  // DB
  const db = getLowDB()
  const offset = (page - 1) * limit
  const posts = db.data.posts.slice(offset, offset + limit)
  db.read()

  return {
    posts,
  }
})
