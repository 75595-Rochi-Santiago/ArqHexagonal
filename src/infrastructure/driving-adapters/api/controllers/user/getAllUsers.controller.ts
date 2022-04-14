import { Request, Response, NextFunction } from 'express'
import { UserGetterUseCase } from '../../../../../application/usecases/User/UserGetter'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const mongoDBUserRepository = new MongoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(mongoDBUserRepository)

  try {
    const allUsers = await userGetterUseCase.run()
    res.json(allUsers)
    return
  } catch (error) {
    // evalua middlewares de errores controlados y errores no controlados
    return next(error)
  }
}
