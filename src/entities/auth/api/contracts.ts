import { num, obj, str } from '@withease/contracts'

export const UserContract = obj({
  id: num,
  email: str,
  created_at: str,
  updated_at: str,
})

export const LoginContract = obj({
  token: str,
})

export const MeContract = obj({
  user: UserContract,
})

export const RegisterContract = obj({
  token: str,
  user: UserContract,
})
