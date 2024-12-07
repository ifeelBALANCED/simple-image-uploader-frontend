import { routes } from '@/shared/routing'
import { Button, Group, Text, Title } from '@mantine/core'
import { Link } from 'atomic-router-react' // eslint-disable-next-line import/no-internal-modules

export const Error404Page = () => {
  return (
    <>
      <Title className="text-5xl font-extrabold">404</Title>
      <Text className="mt-4 text-xl text-gray-600">
        Oops! The page you&#39;re looking for doesn&#39;t exist.
      </Text>
      <Text className="mt-2 text-sm text-gray-500">
        You might have mistyped the address or the page may have moved.
      </Text>
      <Group mt={30}>
        <Link to={routes.upload} className="no-underline">
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
            Go back to Homepage
          </Button>
        </Link>
      </Group>
    </>
  )
}
