import express from 'express'
import dotenv from 'dotenv'

// Router
import mainRouter from './routes'

// Utils
import logger from './utils/logger.utils'

dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT || 1337

app.use(express.json())
app.use(mainRouter)

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
