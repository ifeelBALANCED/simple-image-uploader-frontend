import { arr, num, obj, str } from '@withease/contracts'

const UploadFileContract = obj({
  id: num,
  url: str,
  originalName: str,
  size: num,
  mimetype: str,
  created_at: str,
})

export const UploadFileRequestContract = obj({
  data: UploadFileContract,
})

export const ImagesListRequestContract = obj({
  statusCode: num,
  data: arr(UploadFileContract),
})
