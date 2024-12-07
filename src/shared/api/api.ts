import axios from 'axios/index'
import { env } from '../env'

export const baseApi = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
