import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { signJwt } from '../utils/jwt.utils'
import { v4 } from 'uuid'
import logger from './../utils/logger.utils'

const prisma = new PrismaClient()

export const createSessionService = async (email: string, password: string) => {
  try {
    // Get user from database based on email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Check if password exists on user
    if (!user.password) {
      throw new Error('Password does not exist on user')
    }

    // Compare password with hashed password
    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
      throw new Error('Invalid password')
    }

    // Create session id and tokens
    const sessionId = v4()

    const token = signJwt({ user, sessionId }, { expiresIn: '15m' })
    const refreshToken = signJwt({ user, sessionId }, { expiresIn: '1y' })

    // Create session in database
    await prisma.session.create({
      data: {
        id: sessionId,
        userId: user.id,
        token,
        refreshToken,
      },
    })

    return { token, refreshToken }
  } catch (error: any) {
    throw new Error(`Error creating session: ${error.message}`)
  }
}

export const invalidateSessionService = async (sessionId: string) => {
  try {
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        valid: false,
      },
    })
  } catch (error: any) {
    throw new Error(`Error invalidating session: ${error.message}`)
  }
}
