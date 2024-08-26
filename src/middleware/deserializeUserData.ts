import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt.utils'
import { get, set } from 'lodash'

const deserializeUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtCookie = req.cookies.jwt

  if (!jwtCookie) {
    res.status(401).json({ message: 'Unauthorized' }).send
  }

  try {
    const decoded = verifyJwt(jwtCookie)

    const user = get(decoded, 'user')
    const sessionId = get(decoded, 'sessionId')

    if (!user || !sessionId) {
      throw new Error('Unauthorized')
    }

    set(req, 'user', user)
    set(req, 'sessionId', sessionId)

    next()
  } catch (error: any) {
    return res.status(401).json({ message: error.message })
  }
}
