import { Request, Response, NextFunction } from 'express'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user) {
    req.user = req.session.user
  }
  next()
}
