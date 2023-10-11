export default defineEventHandler(async (event) => {
  console.log(event)
  return {
    proxy: true,
  }
})
