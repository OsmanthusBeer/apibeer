import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

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

const defaultData: Data = { posts: [] }
export function getLowDB() {
  return new LowSync(new JSONFileSync<Data>(filename), defaultData)
}
