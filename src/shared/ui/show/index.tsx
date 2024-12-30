import { ReactNode } from 'react'

interface ShowProps<T> {
  when: T | number | boolean | undefined | null
  children: ReactNode
  orElse?: ReactNode
}

export function Show<T>({ when, children, orElse = null }: ShowProps<T>) {
  return <>{when ? children : orElse}</>
}
