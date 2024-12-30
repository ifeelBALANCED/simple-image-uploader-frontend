export type UploadFile = {
  id: number
  url: string
  originalName: string
  size: number
  mimetype: string
  created_at: string
}

export type UploadFileBody = {
  body: FormData
  user_id: string
}

export type UploadFileResponse = {
  data: UploadFile
}

export type ImagesListBody = Pick<UploadFileBody, 'user_id'>

export type ImagesListResponse = {
  statusCode: number
  data: Array<UploadFile>
}
