import crypto from 'node:crypto'

// refs: https://gravatar.com/site/implement/profiles/jsapi/
export function getGravatarURL(email: string) {
  const address = String(email).trim().toLowerCase()
  const hash = crypto.createHash('sha256').update(address).digest('hex')
  return `https://www.gravatar.com/avatar/${hash}`
}
