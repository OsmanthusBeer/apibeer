import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSONFileSync } from 'lowdb/node'
import { LowSync } from 'lowdb'

interface Post {
  id: number
  title: string
  content: string
}

interface Data {
  posts: Post[]
}

// Read or create db.json
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filename = path.join(__dirname, '../lowdb.json')

const postSeeds = [
  { title: 'hi', content: 'Hello World!' },
  { title: '嗨', content: '你好' },
  { title: 'こんにちは', content: '世界よ、こんにちは！' },
]
const posts = Array.from({ length: 100 }, (_v, k) => {
  const id = k + 1
  const index = Math.floor(Math.random() * 100)
  const seedPost = postSeeds[index % postSeeds.length]
  return {
    id,
    ...seedPost,
  }
})
// Write `lowdb.json`
fs.writeFileSync(filename, JSON.stringify({ posts }, null, 2))

export function getLowDB() {
  return new LowSync(new JSONFileSync<Data>(filename), { posts: [] })
}
