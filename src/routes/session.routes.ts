import { Router } from 'express'

// MIDDLEWARES
import validate from './../middleware/validate'
import authorize from './../middleware/authorize'

// SCHEMAS
import { createSessionSchema } from '../schemas/session.schema'

// CONTROLLERS
import {
  createSessionHandler,
  deleteSessionHandler,
} from '../controllers/session.controller'

const sessionRouter = Router()

// Basic creation routes
sessionRouter.post(
  '/api/sessions/',
  validate(createSessionSchema),
  (req, res) => {
    createSessionHandler(req, res)
  }
)

sessionRouter.delete('/api/sessions/', authorize, (req, res) => {
  deleteSessionHandler(req, res)
})

// OAuth creation routes
// Google OAuth
sessionRouter.get('/api/sessions/oauth/google', (req, res) => {
  res.send('Google OAuth Login')
})

// Facebook OAuth
sessionRouter.get('/api/sessions/oauth/facebook', (req, res) => {
  res.send('Facebook OAuth Login')
})

export default sessionRouter
