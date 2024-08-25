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

// BASIC ROUTES
// Create session
sessionRouter.post(
  '/api/sessions/',
  validate(createSessionSchema),
  (req, res) => {
    createSessionHandler(req, res)
  }
)

// Invalidate session
sessionRouter.delete('/api/sessions/', authorize, (req, res) => {
  deleteSessionHandler(req, res)
})

// Refresh session
sessionRouter.put('/api/sessions/', (req, res) => {})

// OAuth routes
// Google OAuth
sessionRouter.get('/api/sessions/oauth/google', (req, res) => {
  res.send('Google OAuth Login')
})

// Facebook OAuth
sessionRouter.get('/api/sessions/oauth/facebook', (req, res) => {
  res.send('Facebook OAuth Login')
})

export default sessionRouter
