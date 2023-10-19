import { z } from 'zod'

const schemaParams = z.object({ id: z.coerce.number() })
type SchemaParams = z.output<typeof schemaParams>
const schemaBody = z.object({
  title: z.string(),
  content: z.string(),
}).partial().refine(value => Object.values(value).length > 0)
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
  const post = db.data.posts.find(post => post.id === id)
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }
  post.title = title ?? post.title
  post.content = content ?? post.content
  db.write()

  return {
    post,
  }
})
