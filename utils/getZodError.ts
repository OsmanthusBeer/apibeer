import { TRPCClientError } from '@trpc/client'
import { ZodError, type typeToFlattenedError } from 'zod'

export function getZodError<T = any>(error: unknown): null | typeToFlattenedError<T> {
  if (!error)
    return null
  if (!(error instanceof TRPCClientError))
    return null
  if (error.data.code !== 'BAD_REQUEST' || error.data.cause instanceof ZodError)
    return null

  return error.data.zodError
}
