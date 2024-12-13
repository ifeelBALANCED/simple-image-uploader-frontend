import { obj, str } from '@withease/contracts'

export const LoginContract = obj({
  user_email: str,
  user_uuid: str,
  token: str,
})

export const RegisterContract = obj({
  message: str,
})
