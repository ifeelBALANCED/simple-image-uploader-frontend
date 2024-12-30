import { loginQuery, registerQuery } from '@/entities/auth'
import { logoutMutation, meQuery } from '@/entities/auth/api/api'
import { sessionModel } from '@/entities/session'
import { isServerError } from '@/shared/lib/tg/is-server-error'
import { routes } from '@/shared/routing'
import { isHttpErrorCode } from '@farfetched/core'
import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'
import { not } from 'patronum'
import { handleServerError } from '../lib'
import { loginForm, registerForm } from './form'

export const logoutClicked = createEvent()

const authorizedFromRegister = sample({
  clock: registerQuery.$data,
  filter: Boolean,
  fn: ({ token }) => token,
})

const authorizedFromLogin = sample({
  clock: loginQuery.$data,
  filter: Boolean,
  fn: ({ token }) => token,
})

sample({
  clock: loginForm.formValidated,
  source: loginForm.$values,
  filter: loginForm.$isValid,
  target: loginQuery.start,
})

sample({
  clock: registerForm.formValidated,
  source: registerForm.$values.map(({ email, password }) => ({ email, password })),
  filter: registerForm.$isValid,
  target: registerQuery.start,
})

sample({
  clock: registerForm.$values,
  filter: not(registerForm.fields.password.$isValid),
  target: registerForm.fields.confirmPassword.resetErrors,
})

sample({
  clock: registerForm.$values,
  source: registerForm.fields.password.$isValid,
  filter: (isValid, { password, confirmPassword }) => isValid && password !== confirmPassword,
  fn: () => ({
    rule: 'password-match' as const,
    errorText: 'Passwords must match',
  }),
  target: registerForm.fields.confirmPassword.addError,
})

sample({
  clock: authorizedFromLogin,
  target: sessionModel.$token,
})

sample({
  clock: authorizedFromRegister,
  target: sessionModel.$token,
})

sample({
  clock: loginQuery.$error,
  filter: isServerError,
  fn: handleServerError,
  target: loginForm.fields.email.addError,
})

sample({
  clock: registerQuery.$error,
  filter: isServerError,
  fn: handleServerError,
  target: registerForm.fields.email.addError,
})

sample({
  clock: logoutClicked,
  target: logoutMutation.start,
})

sample({
  clock: [logoutMutation.finished.success, logoutMutation.finished.failure],
  target: sessionModel.clearCredentialsFx,
})

sample({
  clock: logoutMutation.finished.failure,
  filter: isHttpErrorCode(401),
  target: routes.login.open,
})

redirect({
  clock: sessionModel.clearCredentialsFx.doneData,
  route: routes.login,
})

sample({
  clock: [loginQuery.finished.success, registerQuery.finished.success],
  target: [meQuery.start, loginForm.reset, registerForm.reset],
})

sample({
  clock: meQuery.$data,
  filter: Boolean,
  fn: ({ user }) => user,
  target: [sessionModel.$user, routes.images.open],
})
