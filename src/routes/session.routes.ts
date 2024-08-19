import { Router } from 'express'

const sessionRouter = Router()

// Basic creation routes
sessionRouter.post('/api/sessions/create', (req, res) => {
  res.send('Login')
})

sessionRouter.delete('/api/sessions/destroy', (req, res) => {
  res.send('Logout')
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
