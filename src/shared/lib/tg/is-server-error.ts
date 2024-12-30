import type { ServerResponseError } from '../../types/server'

export const isServerError = (error: unknown): error is ServerResponseError => {
  return typeof error === 'object' && error !== null && 'message' in error
}
