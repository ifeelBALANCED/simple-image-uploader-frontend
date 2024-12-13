import { appStarted } from '@/shared/config'
import { createHistoryRouter, createRoute } from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'

export const routes = {
  upload: createRoute(),
  login: createRoute(),
  register: createRoute(),
  preview: createRoute<{ imageId: string }>(),
  notFound: createRoute(),
  images: createRoute(),
}

export const routesMap = [
  { path: '/', route: routes.upload },
  { path: '/preview/:imageId', route: routes.preview },
  { path: '/login', route: routes.login },
  { path: '/register', route: routes.register },
  { path: '/images', route: routes.images },
]

export const notFoundRoute = routes.notFound
export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute,
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
