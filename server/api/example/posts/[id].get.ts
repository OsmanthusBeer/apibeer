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
  const post = db.data.posts.find(post => post.id === id)
  db.read()
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  return {
    post,
  }
})
