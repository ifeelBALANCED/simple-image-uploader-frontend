import { type UploadFile, uploadFileQuery } from '@/entities/images'
import { sessionModel } from '@/entities/session'
import { handleServerError } from '@/features/auth/lib'
import { isServerError } from '@/shared/lib/tg/is-server-error'
import { routes } from '@/shared/routing'
import { redirect } from 'atomic-router'
import { createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { spread } from 'patronum'
import { uploadFileForm } from './form'

export const $uploadedFile = createStore<UploadFile | null>(null)

sample({
  clock: uploadFileForm.formValidated,
  source: {
    formValues: uploadFileForm.$values,
    user_id: sessionModel.$userId,
  },
  filter: () => true,
  fn: ({ formValues, user_id }) => ({
    body: Object.entries(formValues).reduce((acc, [key, value]) => {
      if (value) {
        acc.append(key, value)
      }
      return acc
    }, new FormData()),
    user_id: user_id?.toString() ?? '',
  }),
  target: uploadFileQuery.start,
})

const fileFullyUploaded = sample({
  clock: uploadFileQuery.$data,
  filter: Boolean,
  fn: ({ data: uploadedFile }) => uploadedFile,
})

spread({
  source: fileFullyUploaded.map((uploadedFile) => ({
    uploadedFile,
    route: { imageId: String(uploadedFile.id) },
  })),
  targets: {
    uploadedFile: $uploadedFile,
    route: routes.preview.open,
  },
})

sample({
  clock: uploadFileQuery.$error,
  filter: isServerError,
  fn: handleServerError,
  target: uploadFileForm.fields.file.addError,
})

redirect({
  clock: fileFullyUploaded.filterMap(({ id }) => !id),
  route: routes.images,
})

persist({
  store: $uploadedFile,
  key: 'uploadedFile',
})
