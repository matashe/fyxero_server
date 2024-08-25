import * as v from 'valibot'

export const createSessionSchema = v.object({
  data: v.object({
    email: v.pipe(
      v.string('Email must be a string.'),
      v.email('Email must be valid.')
    ),
    password: v.pipe(v.string('Password must be a string.'), v.minLength(8)),
  }),
})

export const refreshSessionSchema = v.object({
  data: v.object({
    refreshToken: v.string('Refresh token must be a string.'),
  }),
})
