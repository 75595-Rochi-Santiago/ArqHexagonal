import { Request, Response, NextFunction } from 'express'
import { User } from '../../../../../domain/entities/User'
import { UserUpdaterUseCase } from '../../../../../application/usecases/User/UserUpdater'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'
import { Users } from '../../../../driven-adapters/MongoDB/models/UserModel'
import { InvalidPropertyError } from '../../../../../domain/exceptions/errors'

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, lastname, username, email, password, city, province } =
    req.body
  const mongoDBUserRepository = new MongoDBUserRepository()
  const userUpdaterUseCase = new UserUpdaterUseCase(mongoDBUserRepository)

  const userToUpdate: User = {
    name,
    lastname,
    username,
    email,
    password,
    city,
    province
  }
  console.log('Datos a actualizar: ', userToUpdate)
  try {
    const valid = await Users.validate(userToUpdate, false)
    if (valid) {
      const userUpdated = await userUpdaterUseCase.run(userToUpdate)
      res.json(userUpdated)
    } else {
      throw new InvalidPropertyError(
        'Invalid input JOI',
        'JOI invalid input'
      )
    }
    return
  } catch (error) {
    // evalua middlewares de errores controlados y errores no controlados
    return next(error)
  }
}
