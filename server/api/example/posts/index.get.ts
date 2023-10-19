import { z } from 'zod'

const schema = z.object({
  page: z.coerce.number().min(1),
  limit: z.coerce.number().min(10),
})
type Schema = z.output<typeof schema>

export default defineEventHandler(async (event) => {
  // pagination
  const query = getQuery<Schema>(event)
  try {
    schema.parse(query)
  }
  catch (error) {
    throwError(error)
  }
  const { page, limit } = query

  const db = getLowDB()
  const offset = (page - 1) * limit
  const posts = db.data.posts.slice(offset, offset + limit)

  return {
    posts,
  }
})
