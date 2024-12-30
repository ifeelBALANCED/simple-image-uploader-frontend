import { env } from '@/shared/env'
import { ServerResponseError } from '@/shared/types/server'
import { createEffect } from 'effector'

/**
 * Types
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * Parameters for making an HTTP request.
 */
type RequestParams = {
  /** The endpoint URL */
  url: string
  /** HTTP method (default is 'GET') */
  method?: HttpMethod
  /** Request body data */
  body?: unknown
  /** Optional custom headers */
  headers?: Record<string, string>
}

/**
 * Request payload, can be either static or dynamic based on input params.
 */
type RequestPayload<P> = RequestParams | ((params: P) => RequestParams)

/**
 * Parameters required for creating a request instance.
 */
type RequestInstanceParams<P> = {
  /** Base URL for the request */
  baseURL: string
  /** Optional headers to include in the request */
  headers?: Record<string, string>
  /** Whether to include an authentication token */
  withToken?: boolean
  /** Payload configuration for the request */
  payload: RequestPayload<P>
}

/**
 * Factory parameters excluding payload.
 */
type RequestFxParams = Omit<RequestInstanceParams<RequestParams>, 'payload'>

/**
 * Constants
 */
const DEFAULT_HEADERS = Object.freeze({
  /** Default Content-Type header */
  'Content-Type': 'application/json',
})

/**
 * Utility functions
 */

/**
 * Resolves payload into a RequestParams object.
 * @param payload - The request payload, either static or dynamic.
 * @param params - Input parameters used to resolve dynamic payloads.
 * @returns Resolved RequestParams object.
 */
const resolvePayload = <P>(payload: RequestPayload<P>, params: P): RequestParams =>
  typeof payload === 'function' ? payload(params) : payload

/**
 * Adds an authentication token to the request headers if available.
 * @param headers - Headers object to modify.
 * @returns Modified headers object with authentication header.
 */
const withAuthToken = (headers: any) => {
  const token = localStorage.getItem('accessToken')?.replace(/^"|"$/g, '')
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers
}

/**
 * Executes an HTTP request based on the specified method.
 * @param url - The full URL for the request.
 * @param method - HTTP method to execute.
 * @param headers - Headers for the request.
 * @param body - Optional request body.
 * @returns Promise resolving to the response data.
 */
const executeRequest = async <R>(
  url: string,
  method: HttpMethod,
  headers: Record<string, string>,
  body?: unknown,
): Promise<R> => {
  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
    mode: 'cors',
  }

  if (body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body)
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Request failed')
  }

  return response.json()
}

/**
 * Core request instance creator.
 * @param baseURL - Base URL for the API.
 * @param headers - Optional headers for the request.
 * @param payload - Configuration for the request payload.
 * @param withToken - Whether to include an authentication token.
 * @returns Effector effect for making the request.
 */
const createRequestInstance = <P = RequestParams, R = void, E = Error>({
  baseURL,
  headers = {},
  payload,
  withToken = false,
}: RequestInstanceParams<P>) =>
  createEffect<P, R, E>(async (params) => {
    const {
      url,
      method = 'GET',
      body,
      headers: customHeaders = {},
    } = resolvePayload(payload, params)

    let requestHeaders = {
      ...(body instanceof FormData ? {} : DEFAULT_HEADERS),
      ...headers,
      ...customHeaders,
    }

    if (withToken) {
      requestHeaders = withAuthToken(requestHeaders)
    }

    const fullUrl = `${baseURL}${url}`

    try {
      return await executeRequest<R>(fullUrl, method, requestHeaders, body)
    } catch (error) {
      console.error(`Request failed: ${method} ${fullUrl}`, error)
      throw error
    }
  })

/**
 * Factory for creating request effects.
 * @param params - Configuration parameters for the request.
 * @returns Function to create a request effect with specified payload.
 */
export const createRequestFx =
  (params: RequestFxParams) =>
  <P = RequestParams, R = void, E = ServerResponseError>(payload: RequestPayload<P>) =>
    createRequestInstance<P, R, E>({
      ...params,
      payload,
    })

/**
 * External API instance for making authorized requests.
 */
export const externalApi = createRequestFx({
  baseURL: env.API_URL,
  withToken: true,
})
