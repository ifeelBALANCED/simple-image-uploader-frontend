import { baseEndpoints, externalApi } from '@/shared/api'
import { createQuery } from '@farfetched/core'
import type { LoginBody, LoginResponse, RegisterBody, RegisterResponse } from '../types'
import { LoginContract, RegisterContract } from './contracts'

export const loginFx = externalApi<LoginBody, LoginResponse>((body) => ({
  url: baseEndpoints.LOGIN.url,
  method: baseEndpoints.LOGIN.method,
  body,
}))

export const loginQuery = createQuery({
  effect: loginFx,
  contract: LoginContract,
})

export const registerFx = externalApi<RegisterBody, RegisterResponse>((body) => ({
  url: baseEndpoints.REGISTER.url,
  method: baseEndpoints.REGISTER.method,
  body,
}))

export const registerQuery = createQuery({
  effect: registerFx,
  contract: RegisterContract,
})
