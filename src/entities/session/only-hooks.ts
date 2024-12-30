import { routes } from '@/shared/routing'
import { RouteInstance, RouteParams, RouteParamsAndQuery, chainRoute } from 'atomic-router'
import { Effect, EventCallable, StoreWritable, createEvent, sample } from 'effector'
import { not } from 'patronum'
import { $isAuthenticated } from './model'

export function filterAuthenticated<T>(
  source: EventCallable<T> | StoreWritable<T> | Effect<T, any, any>,
): EventCallable<T> {
  const target = createEvent<T>()

  // @ts-ignore
  sample({
    source,
    filter: $isAuthenticated,
    target,
  })

  return target
}

export function filterAnonymous<T>(
  source: EventCallable<T> | StoreWritable<T> | Effect<T, any, any>,
): EventCallable<T> {
  const target = createEvent<T>()

  // @ts-ignore
  sample({
    source,
    filter: not($isAuthenticated),
    target,
  })

  return target
}

export function filterOnly<T>(config: {
  when: 'anonymous' | 'authenticated'
  clock: EventCallable<T> | StoreWritable<T> | Effect<T, any, any>
}): EventCallable<T> {
  if (config.when === 'anonymous') return filterAnonymous(config.clock)

  return filterAuthenticated(config.clock)
}

/**
 * Clones the passed route and opens it only if user is authenticated.
 * If the user is not authenticated, redirects to the login page.
 * @param route Original route
 * @returns New route
 */
export function chainAuthenticated<Params extends RouteParams>(route: RouteInstance<Params>) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    filter: $isAuthenticated,
  })

  // sample({
  //   clock: sessionCheckStarted,
  //   filter: $isAuthenticated,
  //   target: routes.images.open,
  // })
  //
  sample({
    clock: sessionCheckStarted,
    filter: not($isAuthenticated),
    target: routes.login.open,
  })

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAuthorized,
  })
}

/**
 * Clones the passed route and opens it only if user is anonymous
 * @param route Original route
 * @returns New route
 */
export function chainAnonymous<Params extends RouteParams>(route: RouteInstance<Params>) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    filter: not($isAuthenticated),
  })

  sample({
    clock: alreadyAnonymous,
    target: routes.login.open,
  })

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAnonymous,
  })
}
