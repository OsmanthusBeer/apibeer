import { z } from 'zod'

const schemaParams = z.object({ id: z.coerce.number() })
type SchemaParams = z.output<typeof schemaParams>
const schemaBody = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})
type SchemaBody = z.output<typeof schemaBody>

export default defineEventHandler(async (event) => {
  let params = getRouterParams(event) as any as SchemaParams
  const body = await readBody<SchemaBody>(event)
  try {
    params = schemaParams.parse(params)
    schemaBody.parse(body)
  }
  catch (error) {
    throwError(error)
  }
  const { id } = params
  const { title, content } = body
  // DB
  const db = getLowDB()
  db.read()
  let post = db.data.posts.find(post => post.id === id)
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }
  post = { ...post, title, content }
  db.write()

  return {
    post,
  }
})
