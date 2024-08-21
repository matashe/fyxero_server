import { Request, Response } from 'express'
import { createSessionService } from '../services/session.service'
import logger from './../utils/logger.utils'

export const createSessionHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' }).send
    }

    const { token, refreshToken } = await createSessionService(email, password)
    logger.info('service passed')

    res.cookie('jwt', token, {})

    res.status(200).json({ data: refreshToken }).send
  } catch (error: any) {
    return res.status(500).json({ data: { message: error.message } })
  }
}
