import { UserProfile, sessionModel } from '@/entities/session'
import { routes } from '@/shared/routing'
import { Icon } from '@/shared/ui/icon'
import { Show } from '@/shared/ui/show'
import { ActionIcon, Button, Group, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

export const Header = () => {
  const { user, isAuthenticated } = useUnit({
    user: sessionModel.$user,
    isAuthenticated: sessionModel.$isAuthenticated,
  })

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-solid shadow-md bg-white">
      <Group justify="space-between" align="center" className="h-full px-4 md:px-8">
        <Button
          component={Link}
          to={routes.upload}
          variant="subtle"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon name="sprite/logo" fontSize={120} className="h-8 w-8 text-blue-600" />
        </Button>

        <Show when={!isAuthenticated} orElse={<UserProfile name={user?.email || ''} />}>
          <Group className="gap-4">
            <Button component={Link} to={routes.login} variant="subtle" className="text-blue-500">
              Login
            </Button>
            <Button
              component={Link}
              to={routes.register}
              variant="outline"
              color="blue"
              radius="md"
              size="sm"
            >
              Register
            </Button>
            <ActionIcon
              variant="light"
              color={dark ? 'yellow' : 'blue'}
              onClick={toggleColorScheme}
              className="ml-2"
              size="lg"
            >
              {dark ? <IconSun size="1.25rem" /> : <IconMoonStars size="1.25rem" />}
            </ActionIcon>
          </Group>
        </Show>
      </Group>
    </header>
  )
}
