import { createRule } from '@/shared/lib/form'
import { createForm } from 'effector-forms'
import * as yup from 'yup'

export const loginForm = createForm({
  fields: {
    email: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Email is required'),
          name: 'required',
        }),
        createRule({
          schema: yup.string().email('Email is invalid'),
          name: 'is-email',
        }),
        createRule({
          schema: yup.string().min(1, 'Email is too short'),
          name: 'min-length-1',
        }),
        createRule({
          schema: yup.string().max(70, 'Email is too long'),
          name: 'max-length-70',
        }),
      ],
    },
    password: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Password is required'),
          name: 'required',
        }),
        createRule({
          schema: yup.string().min(8, 'Password must be at least 8 characters long'),
          name: 'min-length-8',
        }),
        createRule({
          schema: yup.string().max(128, 'Password is too long'),
          name: 'max-length-128',
        }),
        createRule({
          schema: yup
            .string()
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
          name: 'has-lowercase',
        }),
        createRule({
          schema: yup
            .string()
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
          name: 'has-uppercase',
        }),
        createRule({
          schema: yup.string().matches(/\d/, 'Password must contain at least one digit'),
          name: 'has-digit',
        }),
        createRule({
          schema: yup
            .string()
            .matches(
              /[!@#$%^&*()\-_=+[\]{}|;:,.<>?/~`]/,
              'Password must contain at least one special character',
            ),
          name: 'has-special',
        }),
        createRule({
          schema: yup.string().matches(/^\S*$/, 'Password must not contain any whitespace'),
          name: 'no-whitespace',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})

export const registerForm = createForm({
  fields: {
    email: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Email is required'),
          name: 'required',
        }),
        createRule({
          schema: yup.string().email('Email is invalid'),
          name: 'is-email',
        }),
        createRule({
          schema: yup.string().min(1, 'Email is too short'),
          name: 'min-length-1',
        }),
        createRule({
          schema: yup.string().max(70, 'Email is too long'),
          name: 'max-length-70',
        }),
      ],
    },
    password: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Password is required'),
          name: 'required',
        }),
        createRule({
          schema: yup.string().min(8, 'Password must be at least 8 characters long'),
          name: 'min-length-8',
        }),
        createRule({
          schema: yup.string().max(128, 'Password is too long'),
          name: 'max-length-128',
        }),
        createRule({
          schema: yup
            .string()
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
          name: 'has-lowercase',
        }),
        createRule({
          schema: yup
            .string()
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
          name: 'has-uppercase',
        }),
        createRule({
          schema: yup.string().matches(/\d/, 'Password must contain at least one digit'),
          name: 'has-digit',
        }),
        createRule({
          schema: yup
            .string()
            .matches(
              /[!@#$%^&*()\-_=+[\]{}|;:,.<>?/~`]/,
              'Password must contain at least one special character',
            ),
          name: 'has-special',
        }),
        createRule({
          schema: yup.string().matches(/^\S*$/, 'Password must not contain any whitespace'),
          name: 'no-whitespace',
        }),
      ],
    },
    confirmPassword: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Confirm Password is required'),
          name: 'required',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})
