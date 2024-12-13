export const baseEndpoints = {
  UPLOAD: {
    url: `/upload/`,
    method: 'POST',
  },
  IMAGE_PREVIEW: {
    url: `/image-preview/`,
    method: 'GET',
  },
  IMAGES: {
    url: `/images/`,
    method: 'GET',
  },
  REGISTER: {
    url: `/register/`,
    method: 'POST',
  },
  LOGIN: {
    url: `/login/`,
    method: 'POST',
  },
  LOGOUT: {
    url: `/logout/`,
    method: 'POST',
  },
} as const
