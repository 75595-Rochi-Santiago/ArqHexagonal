import { Request, Response, NextFunction } from 'express'
import { User } from '../../../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../../../application/usecases/User/UserCreator'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'

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
  console.log('Usuario a crear pa: ', userToCreate)
  try {
    const userCreated = await userCreatorUseCase.run(userToCreate)
    res.json(userCreated)
    return
  } catch (error) {
    // evalua middlewares de errores controlados y errores no controlados
    return next(error)
  }
}
