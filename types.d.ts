import type { $Enums, User } from '@prisma/client'

//  RouteMeta` w/ custom properties, like `requiredAuth`
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {
    requiredAuth?: boolean
  }
}

// Re Export `prisma` enums
export type ApiMethod = $Enums.ApiMethod
export type ApiStatus = $Enums.ApiStatus
export type ProjectVisibility = $Enums.ProjectVisibility
export type Role = $Enums.Role

export type SessionUser = Pick<User, 'id' | 'email' | 'username' | 'avatar'>
export interface Session {
  user: SessionUser
}
