import { loginQuery } from '@/entities/auth'
import { sample } from 'effector'
import { debug } from 'patronum'
import { loginForm } from './form'

sample({
  clock: loginForm.submit,
  source: loginForm.$values,
  filter: loginForm.$isValid,
  target: loginQuery.start,
})

debug(loginQuery.$data)
