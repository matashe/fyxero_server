import { Request, Response } from 'express'

// SERVICES
import { createUserService } from '../services/user.service'

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(
      req.body.data.email,
      req.body.data.password,
      req.body.data.passwordConfirmation
    )

    res.status(201).send(user)
  } catch (error: any) {
    res.status(400).send({ data: { message: error.message } })
  }
}
