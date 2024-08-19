import { Router } from 'express'

const userRouter = Router()

userRouter.get('/api/users', (req, res) => {
  res.send('GET /users')
})

export default userRouter
