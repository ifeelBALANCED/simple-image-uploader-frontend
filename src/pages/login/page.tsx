import { loginForm } from '@/entities/auth'
// eslint-disable-next-line import/no-internal-modules
import { routes } from '@/shared/routing'
import { Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { Link } from 'atomic-router-react'
import { useForm } from 'effector-forms'
import { FormEventHandler } from 'react'

export const LoginPage = () => {
  const { fields, eachValid, submit, isValid, errorText, hasError } = useForm(loginForm)
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
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
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          classNames={{
            label: 'text-sapphire',
            input: 'text-black',
          }}
          aria-required="true"
          value={fields.email.value}
          onChange={(e) => fields.email.onChange(e.target.value)}
          error={hasError('email') ? errorText('email') : null}
          data-testid="email-input"
          aria-invalid={hasError('email')}
          aria-errormessage={errorText('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          classNames={{
            label: 'text-sapphire',
            input: 'text-black',
          }}
          aria-required="true"
          value={fields.password.value}
          onChange={(e) => fields.password.onChange(e.target.value)}
          error={hasError('password') ? errorText('password') : null}
          data-testid="password-input"
          aria-invalid={hasError('password')}
          aria-errormessage={errorText('password')}
        />

        <Button
          type="submit"
          fullWidth
          radius="md"
          size="md"
          disabled={!eachValid || !isValid}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Log In
        </Button>
      </form>
    </Paper>
  )
}
