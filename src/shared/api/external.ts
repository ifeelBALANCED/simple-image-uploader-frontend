import { createEffect } from 'effector'
import wretch from 'wretch'
import { env } from '../env'

type CreateRequestParams = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  headers?: Record<string, string>
}

type Fn<P> = (params: P) => CreateRequestParams
type Payload<P> = CreateRequestParams | Fn<P>

type CreateRequestInstanceParams<P> = {
  baseURL: string
  headers?: Record<string, string>
  withTokenInHeaders?: boolean
  payload: Payload<P>
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

function getConfig<P>(payload: Payload<P>, params: P): CreateRequestParams {
  return typeof payload === 'function' ? payload(params) : payload
}

const createRequestInstance = <P = CreateRequestParams, R = void>({
  baseURL,
  headers = {},
  payload,
  withTokenInHeaders,
}: CreateRequestInstanceParams<P>) =>
  createEffect<P, R>((params) => {
    const { url, method = 'GET', body, headers: configHeaders = {} } = getConfig(payload, params)

    let api = wretch(baseURL)
      .headers({ ...DEFAULT_HEADERS, ...headers, ...configHeaders })
      .options({ credentials: 'include', mode: 'cors' })

    if (withTokenInHeaders) {
      const token = localStorage.getItem('accessToken')
      if (token) {
        api = api.auth(`Bearer ${token}`)
      }
    }

    api = api.url(url)

    switch (method) {
      case 'GET':
        return api.get().json<R>()
      case 'POST':
        return api.post(body).json<R>()
      case 'PUT':
        return api.put(body).json<R>()
      case 'DELETE':
        return api.delete().json<R>()
      case 'PATCH':
        return api.patch(body).json<R>()
      default:
        throw new Error(`Unsupported method: ${method}`)
    }
  })

type CreateRequestFxParams = Omit<CreateRequestInstanceParams<CreateRequestParams>, 'payload'>

export const createRequestFx =
  (params: CreateRequestFxParams) =>
  <P = CreateRequestParams, R = void>(payload: Payload<P>) =>
    createRequestInstance<P, R>({
      ...params,
      payload,
    })

export const externalApi = createRequestFx({
  baseURL: env.API_URL,
  withTokenInHeaders: true,
})
