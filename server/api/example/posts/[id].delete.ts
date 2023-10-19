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
  db.data.posts = db.data.posts.filter(post => post.id !== id)
  db.write()

  return {
    message: 'Post deleted',
  }
})
