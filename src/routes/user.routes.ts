import { Router } from 'express'

// MIDDLEWARES
import validate from './../middleware/validate'

// SCHEMAS
import { createUserSchema } from './../schemas/user.schema'

// HANDLERS
import { createUserHandler } from './../controllers/user.controller'

const userRouter = Router()

userRouter.post('/api/users', validate(createUserSchema), (req, res) => {
  createUserHandler(req, res)
})

export default userRouter
