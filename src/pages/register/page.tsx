import { registerForm } from '@/entities/auth'
import { routes } from '@/shared/routing'
import { Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { Link } from 'atomic-router-react'
import { useForm } from 'effector-forms'
import { FormEventHandler } from 'react'

export const RegisterPage = () => {
  const { fields, eachValid, submit, isValid, hasError, errorText } = useForm(registerForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
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

        <PasswordInput
          label="Confirm password"
          placeholder="Confirm your password"
          required
          mt="md"
          classNames={{
            label: 'text-sapphire',
            input: 'text-black',
          }}
          aria-required="true"
          value={fields.configPassword.value}
          onChange={(e) => fields.configPassword.onChange(e.target.value)}
          error={hasError('configPassword') ? errorText('configPassword') : null}
          data-testid="password-input"
          aria-invalid={hasError('configPassword')}
          aria-errormessage={errorText('configPassword')}
        />

        <Button
          type="submit"
          fullWidth
          radius="md"
          size="md"
          disabled={!eachValid || !isValid}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Register
        </Button>
      </form>
    </Paper>
  )
}
