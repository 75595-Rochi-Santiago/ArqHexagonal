import { UserAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import {
  UnauthorizedError,
  RequiredParamError,
  InvalidPropertyError,
  InvalidNullError,
  NotFoundError,
  ExistingResource,
  ForbiddenError
} from '../../../../domain/exceptions/errors'
import { Request, Response, Router, NextFunction } from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'

const route = Router()

route.use('/users', userRoutes)
route.use('/auth', authRoutes)
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
  } else if (err instanceof UnauthorizedError) {
    res.status(err.status).json({
      name: err.name,
      type: err.type
    })
  } else if (err instanceof RequiredParamError) {
    res.status(err.status).json({
      name: err.name,
      type: err.type
    })
  } else if (err instanceof InvalidPropertyError) {
    res.status(err.status).json({
      name: err.name,
      type: err.type
    })
  } else if (err instanceof InvalidNullError) {
    res.status(err.status).json({
      name: err.name,
      type: err.type
    })
  } else if (err instanceof NotFoundError) {
    res.status(err.status).json({
      name: err.name,
      type: err.type
    })
  } else if (err instanceof ExistingResource) {
    res.status(err.status).json({
      name: err.name,
      type: err.type
    })
  } else if (err instanceof ForbiddenError) {
    res.status(err.status).json({
      name: err.name,
      type: err.type
    })
  } else {
    console.log(err)
    next(err)
  }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({ error: err })
})

export default route
