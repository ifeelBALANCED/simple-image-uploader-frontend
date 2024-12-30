import type { User } from '@/entities/auth'
import { createEffect, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { reset, reshape } from 'patronum'

export const $token = createStore<string>('')
export const $user = createStore<User | null>(null)
export const $isAuthenticated = createStore<boolean>(false)

export const clearCredentialsFx = createEffect(() => {
  localStorage.clear()
})

export const { $userId } = reshape({
  source: $user,
  shape: {
    $userId: (user) => user?.id ?? null,
  },
})

sample({
  source: $token,
  fn: Boolean,
  target: $isAuthenticated,
})

persist({
  store: $token,
  key: 'accessToken',
})

persist({
  store: $user,
  key: 'user',
})

reset({
  clock: clearCredentialsFx.done,
  target: [$token, $user, $isAuthenticated],
})
