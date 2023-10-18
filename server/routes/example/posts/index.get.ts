export default defineEventHandler(async (_event) => {
  const db = getLowDB()
  const posts = db.data.posts

  return {
    posts,
  }
})
