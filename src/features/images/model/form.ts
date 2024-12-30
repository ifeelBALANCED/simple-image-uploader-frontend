import { createForm } from 'effector-forms'

export const uploadFileForm = createForm({
  fields: {
    file: {
      init: null as File | null,
    },
  },
  validateOn: ['submit'],
})
