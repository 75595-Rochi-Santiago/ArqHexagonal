import { Request, Response, NextFunction } from 'express'
import { User } from '../../../../../domain/entities/User'
import { UserUpdaterUseCase } from '../../../../../application/usecases/User/UserUpdater'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'

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
    const userUpdated = await userUpdaterUseCase.run(userToUpdate)
    res.json(userUpdated)
    return
  } catch (error) {
    // evalua middlewares de errores controlados y errores no controlados
    return next(error)
  }
}
