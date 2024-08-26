import { Request, Response } from 'express'
import {
  createSessionService,
  invalidateSessionService,
  refreshSessionService,
} from '../services/session.service'
import logger from './../utils/logger.utils'
import { get } from 'lodash'

// CRAETE SESSION
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

// DELETE SESSION
export const deleteSessionHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = get(req, 'sessionId')

    if (!sessionId) {
      return res.status(404).json({ data: { message: 'Session ID not found' } })
    }

    invalidateSessionService(sessionId)
  } catch (error: any) {
    return res.status(500).json({ data: { message: error.message } })
  }
}

// REFRESH SESSION
export const refreshSessionHandler = async (req: Request, res: Response) => {
  const refreshToken = req.body.data.refreshToken as string

  try {
    const newToken = await refreshSessionService(refreshToken)

    res.status(200).json({ data: newToken }).send
  } catch (error: any) {
    if (error.message === 'Token expired') {
      return res.status(403).json({ data: { message: error.message } })
    } else if (error.message === 'Session not found') {
      return res.status(404).json({ data: { message: error.message } })
    } else {
      return res.status(401).json({ data: { message: error.message } })
    }
  }
}
