import { authModel } from '@/features/auth'
import { routes } from '@/shared/routing'
import { Avatar, Button, Menu, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconLogout, IconPhoto, IconUpload } from '@tabler/icons-react'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { HTMLAttributes, ReactNode, useState } from 'react'

interface UserButtonProps extends HTMLAttributes<HTMLButtonElement> {
  image?: string | null
  name: string
  icon?: ReactNode
}

export const UserProfile = ({ image, name }: UserButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const DEFAULT_IMAGE = '/api/placeholder/150/150'
  const { onLogout } = useUnit({
    onLogout: authModel.logoutClicked,
  })

  return (
    <div className="flex items-center gap-4">
      <Button
        component={Link}
        to={routes.images}
        leftSection={<IconPhoto size={16} />}
        variant="light"
        className="transition-colors duration-200 text-gray-700 hover:bg-gray-100"
      >
        Images
      </Button>

      <Button
        component={Link}
        to={routes.upload}
        leftSection={<IconUpload size={16} />}
        variant="light"
        className="transition-colors duration-200 text-gray-700 hover:bg-gray-100"
      >
        Upload
      </Button>

      <Menu
        width={200}
        position="bottom-end"
        opened={isOpen}
        onChange={setIsOpen}
        transitionProps={{ transition: 'pop-top-right' }}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={classNames(
              'flex items-center gap-3 p-1 rounded-lg transition-colors duration-200',
              {
                'bg-gray-100': isOpen,
                'hover:bg-gray-50': !isOpen,
              },
            )}
          >
            <Avatar src={image || DEFAULT_IMAGE} size="md" radius="xl" />

            <div className="flex flex-col flex-1 min-w-0">
              <Text className="text-sm font-medium truncate text-gray-900">{name}</Text>
            </div>

            <IconChevronDown
              size={16}
              className={classNames('transition-transform duration-200 text-gray-500', {
                'rotate-180': isOpen,
              })}
            />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="bg-white border border-gray-200">
          <Menu.Item
            onClick={onLogout}
            leftSection={<IconLogout size={16} className="text-gray-500" />}
            className="transition-colors duration-200 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
