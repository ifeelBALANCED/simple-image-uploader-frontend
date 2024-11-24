import { Button, Checkbox, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { Link } from 'atomic-router-react'
import { FormEventHandler } from 'react' // eslint-disable-next-line import/no-internal-modules
import { routes } from '@/shared/routing'

export const RegisterPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <Paper withBorder shadow="md" p={30} radius="md" className="w-full max-w-md">
      <Title className="text-center text-2xl font-bold">Create an Account</Title>
      <Text size="sm" c="dimmed" mt="md" className="text-center">
        Already have an account?{' '}
        <Link to={routes.login} className="text-blue-500 hover:underline">
          Log in
        </Link>
      </Text>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <TextInput label="Email" placeholder="you@example.com" withAsterisk />
        <PasswordInput label="Password" placeholder="Your password" withAsterisk />
        <PasswordInput label="Confirm Password" placeholder="Re-enter your password" withAsterisk />
        <Checkbox label="I agree to the terms and conditions" />

        <Button
          type="submit"
          fullWidth
          radius="md"
          size="md"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Register
        </Button>
      </form>
    </Paper>
  )
}
