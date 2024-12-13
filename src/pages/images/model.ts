import { chainAuthenticated } from '@/entities/session'
import { routes } from '@/shared/routing'

export const currentRoute = routes.images
export const authenticatedRoute = chainAuthenticated(currentRoute)
