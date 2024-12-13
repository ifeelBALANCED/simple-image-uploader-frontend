type EnvType = {
  NODE_ENV: string
  CI: boolean
  API_URL: string
  BASE_URL: string
}

export const getEnvVariable = (key: string): string => {
  if (!import.meta.env[key]) {
    throw new Error(`Env variable ${key} is not defined`)
  }

  return String(import.meta.env[key])
}

export const env: EnvType = {
  NODE_ENV: getEnvVariable('VITE_NODE_ENV'),
  BASE_URL: getEnvVariable('VITE_BASE_URL'),
  CI: getEnvVariable('VITE_CI') === 'true',
  API_URL: getEnvVariable('VITE_API_URL'),
}
