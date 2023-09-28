import type { User } from '@prisma/client'

//  RouteMeta` w/ cusotm properties, like `requiredAuth`
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {
    requiredAuth?: boolean
  }
}

export type SessionUser = Pick<User, 'id' | 'email' | 'username'>
export interface Session {
  user: SessionUser
}
