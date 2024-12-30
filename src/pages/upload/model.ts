import { chainAuthenticated } from '@/entities/session'
import { routes } from '@/shared/routing'
import '@/features/images/model'
import { imagesModel } from '@/features/images'
import { sample } from 'effector'

export const currentRoute = routes.upload

export const authenticatedRoute = chainAuthenticated(currentRoute)

sample({
  clock: authenticatedRoute.closed,
  target: imagesModel.uploadFileForm.reset,
})
