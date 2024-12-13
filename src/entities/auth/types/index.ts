export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  user_email: string
  user_uuid: string
  token: string
}

export type RegisterBody = {
  email: string
  password: string
}

export type RegisterResponse = { message: string }
