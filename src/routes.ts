import { Router } from 'express'

// Routers
import defaultRouter from './routes/default.routes'
import userRouter from './routes/user.routes'

const mainRouter = Router()

mainRouter.use(defaultRouter)
mainRouter.use(userRouter)

export default mainRouter
