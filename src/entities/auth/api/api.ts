import { baseEndpoints, externalApi } from '@/shared/api'
import { createMutation, createQuery } from '@farfetched/core'
import type { LoginBody, LoginResponse, RegisterBody, User } from '../types'
import { LoginContract, MeContract, RegisterContract } from './contracts'

export const loginFx = externalApi<LoginBody, LoginResponse>((body) => ({
  url: baseEndpoints.LOGIN.url,
  method: baseEndpoints.LOGIN.method,
  body,
}))

export const registerFx = externalApi<RegisterBody, LoginResponse>((body) => ({
  url: baseEndpoints.REGISTER.url,
  method: baseEndpoints.REGISTER.method,
  body,
}))

export const logoutFx = externalApi<void, string>(() => ({
  url: baseEndpoints.LOGOUT.url,
  method: baseEndpoints.LOGOUT.method,
  body: {},
}))

export const meFx = externalApi<void, { user: User }>(() => ({
  url: baseEndpoints.ME.url,
  method: baseEndpoints.ME.method,
}))

export const loginQuery = createQuery({
  effect: loginFx,
  name: 'login',
  contract: LoginContract,
})

export const registerQuery = createQuery({
  effect: registerFx,
  name: 'register',
  contract: RegisterContract,
})

export const meQuery = createQuery({
  effect: meFx,
  name: 'me',
  contract: MeContract,
})

export const logoutMutation = createMutation({
  effect: logoutFx,
  name: 'logout',
})
