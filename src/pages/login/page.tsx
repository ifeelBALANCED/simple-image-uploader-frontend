import { Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { Link } from 'atomic-router-react'
import { FormEventHandler } from 'react' // eslint-disable-next-line import/no-internal-modules
import { routes } from '@/shared/routing'

export const LoginPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <Paper withBorder shadow="md" p={30} radius="md" className="w-full max-w-md">
      <Title className="text-center text-2xl font-bold">Welcome Back</Title>
      <Text size="sm" c="dimmed" mt="md" className="justify-center flex items-center gap-1">
        Don&apos;t have an account?
        <Link to={routes.register} className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </Text>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <TextInput label="Email" placeholder="you@example.com" withAsterisk />
        <PasswordInput label="Password" placeholder="Your password" withAsterisk />

        <Button
          type="submit"
          fullWidth
          radius="md"
          size="md"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Log In
        </Button>
      </form>
    </Paper>
  )
}
