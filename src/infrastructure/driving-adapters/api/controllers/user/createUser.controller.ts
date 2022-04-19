import { Request, Response, NextFunction } from 'express'
import { User } from '../../../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../../../application/usecases/User/UserCreator'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'
import { Users } from '../../../../driven-adapters/MongoDB/models/UserModel'
import { InvalidPropertyError } from '../../../../../domain/exceptions/errors'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    lastname,
    username,
    email,
    password,
    city,
    province
  } = req.body
  const mongoDBUserRepository = new MongoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(mongoDBUserRepository)

  const userToCreate: User = {
    name,
    lastname,
    username,
    email,
    password,
    city,
    province
  }
  try {
    const valid = await Users.validate(userToCreate)
    if (valid) {
      const userCreated = await userCreatorUseCase.run(userToCreate)
      res.json(userCreated)
    } else {
      throw new InvalidPropertyError('Invalid input JOI', 'JOI invalid input')
    }
  } catch (error) {
    // evalua middlewares de errores controlados y errores no controlados
    return next(error)
  }
}
