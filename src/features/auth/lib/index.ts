import type { ServerResponseError } from '@/shared/types/server'

export const handleServerError = (error: ServerResponseError) => ({
  rule: 'server-error' as const,
  errorText: error.message,
})
