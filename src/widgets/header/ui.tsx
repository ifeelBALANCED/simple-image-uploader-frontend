// eslint-disable-next-line import/no-internal-modules
import { routes } from '@/shared/routing'
import { Icon } from '@/shared/ui/icon'
import { ActionIcon, Button, Group, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { Link } from 'atomic-router-react'

export const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <header className="h-16 shadow-md">
      <Group justify="space-between" align="center" className="h-full px-4 md:px-8">
        <Button component={Link} to={routes.upload} variant="transparent">
          <Icon name="sprite/logo" fontSize={120} className="h-8 w-8 text-blue-600" />
        </Button>

        <Group gap="md">
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
            aria-label="Toggle color scheme"
          >
            {dark ? <IconSun size="1.5rem" /> : <IconMoonStars size="1.5rem" />}
          </ActionIcon>
        </Group>
      </Group>
    </header>
  )
}
