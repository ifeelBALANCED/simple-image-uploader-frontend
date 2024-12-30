export const baseEndpoints = {
  UPLOAD: {
    url: `/api/image/upload`,
    method: 'POST',
  },
  IMAGES: {
    url: `/api/image/list`,
    method: 'GET',
  },
  REGISTER: {
    url: `/api/register`,
    method: 'POST',
  },
  LOGIN: {
    url: `/api/login`,
    method: 'POST',
  },
  ME: {
    url: `/api/me`,
    method: 'GET',
  },
  LOGOUT: {
    url: `/api/logout`,
    method: 'POST',
  },
} as const
