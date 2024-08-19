import { AnySchema, parse } from 'valibot'
import { Request, Response, NextFunction } from 'express'

const validate =
  (schema: AnySchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = parse(req.body, schema)
      next()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

export default validate
