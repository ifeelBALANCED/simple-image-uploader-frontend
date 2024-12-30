import { chainAuthenticated } from '@/entities/session'
import { routes } from '@/shared/routing'
import { sample } from 'effector'
import { empty } from 'patronum'

export const currentRoute = routes.preview

export const authenticatedRoute = chainAuthenticated(currentRoute)

sample({
  clock: authenticatedRoute.$params,
  filter: empty(authenticatedRoute.$params),
  target: routes.images.open,
})
