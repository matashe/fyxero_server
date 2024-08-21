import { ObjectSchema, parse } from 'valibot'
import { Request, Response, NextFunction } from 'express'
import logger from './../utils/logger.utils'

const validate =
  (schema: ObjectSchema<any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      parse(schema, req.body)
      next()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

export default validate
