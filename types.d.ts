import type { User } from '@prisma/client'

//  RouteMeta` w/ custom properties, like `requiredAuth`
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {
    requiredAuth?: boolean
  }
}

// refs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export enum ApiMethod {
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  POST = 'POST',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH',
  CUSTOM = 'CUSTOM',
}
export enum ApiStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}
export enum ProjectVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
export enum Role {
  Owner = 'Owner',
  Maintainer = 'Maintainer',
  Developer = 'Developer',
  Viewer = 'Viewer',
}
export enum InviteStatus {
  Pending = 'Pending',
  Success = 'Success',
  Reject = 'Reject',
}

export type SessionUser = Pick<User, 'id' | 'email' | 'username' | 'avatar'>
export interface Session {
  user: SessionUser
}

export interface ApiParams {
  key: string
  type: 'string' | 'number'
  example?: string
  description?: string
  required: boolean
  scope: 'query' | 'path'
}
