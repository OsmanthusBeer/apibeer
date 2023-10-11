interface Payload {
  method: string
  url: string
  params: Record<string, any>
  headers: Record<string, any>
  auth: Record<string, any>
  body: Record<string, any>
}

// TODO: Use trcp?
export default defineEventHandler(async (event) => {
  const payload = await readBody<Payload>(event)
  return $fetch(payload.url, {
    method: payload.method as any,
    headers: payload.headers,
    params: payload.params,
    // body?
  })
})
