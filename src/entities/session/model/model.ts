import { createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

export const $token = createStore<string>('')

export const $isAuthenticated = createStore<boolean>(false)

sample({
  source: $token,
  fn: Boolean,
  target: $isAuthenticated,
})

persist({
  store: $token,
  key: 'accessToken',
})
