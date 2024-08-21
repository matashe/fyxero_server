import { PrismaClient } from '@prisma/client'
import { omit } from 'lodash'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const createUserService = async (
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  const compare = password === passwordConfirmation

  if (!compare) {
    throw new Error('Passwords do not match 😢')
  }

  try {
    const saltRounds = process.env.ENC_BCRYPT_SALT_ROUNDS
    const hashedPassword = await bcrypt.hash(password, Number(saltRounds))

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    if (!user) {
      throw new Error('User not created 😢')
    }

    return omit(user, ['password'])
  } catch (error: any) {
    throw new Error(error)
  }
}
