import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})
type Schema = z.output<typeof schema>

export default defineEventHandler(async (event) => {
  const body = await readBody<Schema>(event)
  try {
    schema.parse(body)
  }
  catch (error) {
    throwError(error)
  }

  const { title, content } = body

  const db = getLowDB()
  const id = db.data.posts.length + 1

  if (id > 100) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Unprocessable Entity',
      message: 'Maximum number of posts reached',
    })
  }
  const post = {
    id,
    title,
    content,
  }
  db.data.posts.push(post)
  db.write()

  return {
    post,
  }
})
