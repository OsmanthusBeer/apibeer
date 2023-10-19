import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export function throwError(error: unknown) {
  if (error instanceof z.ZodError) {
    throw createError({
      status: 422,
      statusMessage: 'Unprocessable Entity',
      message: fromZodError(error).message,
    })
  }
  if (error instanceof Error) {
    throw createError ({
      status: 500,
      statusMessage: 'Internal Server Error',
      message: error.message,
    })
  }
  throw createError({
    status: 500,
    statusMessage: 'Internal Server Error',
    message: JSON.stringify(error),
  })
}
