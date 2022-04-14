import { UserAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import { Request, Response, Router, NextFunction } from 'express'
import userRoutes from './user.routes'

const route = Router()

route.use('/users', userRoutes)
// middlewares handle errors
route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserAlreadyExistsException) {
    res.status(400).json({
      message: 'The user has already been registered '
    })
  } else if (err instanceof UserNotFoundException) {
    res.status(400).json({
      message: 'Username does not exist'
    })
  } else {
    next(err)
  }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({ error: err })
})

export default route
