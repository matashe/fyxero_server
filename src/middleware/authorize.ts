import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from './../utils/jwt.utils'

const authorize = (req: Request, res: Response, next: NextFunction) => {
  // Check if JWT exists in cookie
  if (!req.headers.cookie) {
    return res.status(401).json({ message: 'JWT missing' })
  }

  // Extract JWT from cookie
  const jwt = req.headers.cookie.split('=')[1]

  try {
    verifyJwt(jwt)
  } catch (error: any) {
    return res.status(401).json({ message: error.message })
  }

  next()
}

export default authorize
