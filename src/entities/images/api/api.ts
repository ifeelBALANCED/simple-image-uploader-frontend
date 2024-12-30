import { baseEndpoints, externalApi } from '@/shared/api'
import { createQuery } from '@farfetched/core'
import type {
  ImagesListBody,
  ImagesListResponse,
  UploadFileBody,
  UploadFileResponse,
} from '../types'
import { ImagesListRequestContract, UploadFileRequestContract } from './contracts'

export const uploadFileFx = externalApi<UploadFileBody, UploadFileResponse>(
  ({ user_id, body }) => ({
    url: `${baseEndpoints.UPLOAD.url}?user_id=${user_id}`,
    method: baseEndpoints.UPLOAD.method,
    body,
  }),
)

export const getImagesListFx = externalApi<ImagesListBody, ImagesListResponse>(({ user_id }) => ({
  url: `${baseEndpoints.IMAGES.url}?user_id=${user_id}`,
  method: baseEndpoints.IMAGES.method,
}))

export const uploadFileQuery = createQuery({
  effect: uploadFileFx,
  name: 'uploadFile',
  contract: UploadFileRequestContract,
})

export const getImagesListQuery = createQuery({
  effect: getImagesListFx,
  name: 'getImagesList',
  contract: ImagesListRequestContract,
})
