export type User = {
  id: number
  email: string
  created_at: string
  updated_at: string
}

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export type RegisterBody = {
  email: string
  password: string
}
