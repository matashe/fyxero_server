import pino from 'pino'
import { transform } from 'valibot'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

export default logger
