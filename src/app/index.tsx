import { Pages } from '@/pages'
// eslint-disable-next-line import/no-internal-modules
import { router } from '@/shared/routing'
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'atomic-router-react'
import { theme } from './theme'

export const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <RouterProvider router={router}>
        <Pages />
      </RouterProvider>
    </MantineProvider>
  )
}
