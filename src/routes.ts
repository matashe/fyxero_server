import { Router } from 'express'

// Routers
import defaultRouter from './routes/default.routes'
import userRouter from './routes/user.routes'
import sessionRouter from './routes/session.routes'

const mainRouter = Router()

mainRouter.use(defaultRouter)
mainRouter.use(userRouter)
mainRouter.use(sessionRouter)

export default mainRouter
