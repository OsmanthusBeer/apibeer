import { z } from 'zod'

const schema = z.object({ id: z.number() })
type Schema = z.output<typeof schema>

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event) as any as Schema
  try {
    schema.parse(params)
  }
  catch (error) {
    throwError(error)
  }
  const { id } = params

  const db = getLowDB()
  const post = db.data.posts.find(post => post.id === id)
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
