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

const defaultData = JSON.parse(fs.readFileSync(filename, 'utf-8')) as Data
export function getLowDB() {
  return new LowSync(new JSONFileSync<Data>(filename), defaultData)
}
