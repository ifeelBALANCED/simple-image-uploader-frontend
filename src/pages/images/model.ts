import { UploadFile, getImagesListQuery } from '@/entities/images'
import { chainAuthenticated, sessionModel } from '@/entities/session'
import { routes } from '@/shared/routing'
import { createStore, sample } from 'effector'

export const currentRoute = routes.images
export const authenticatedRoute = chainAuthenticated(currentRoute)

export const $uploadedFiles = createStore<UploadFile[]>([])

sample({
  clock: authenticatedRoute.opened,
  source: sessionModel.$userId,
  filter: Boolean,
  fn: (user_id) => ({ user_id: String(user_id) }),
  target: getImagesListQuery.start,
})

sample({
  clock: getImagesListQuery.$data,
  filter: Boolean,
  fn: ({ data: images }) => images,
  target: $uploadedFiles,
})
