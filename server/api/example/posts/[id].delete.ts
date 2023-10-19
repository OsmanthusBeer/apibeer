import { z } from 'zod'

const schema = z.object({ id: z.coerce.number() })
type Schema = z.output<typeof schema>

export default defineEventHandler(async (event) => {
  let params = getRouterParams(event) as any as Schema
  try {
    params = schema.parse(params)
  }
  catch (error) {
    throwError(error)
  }
  const { id } = params
  // DB
  const db = getLowDB()
  const index = db.data.posts.findIndex(post => post.id !== id)
  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  db.data.posts.splice(index, 1)
  db.write()

  return {
    message: 'Post deleted',
  }
})
