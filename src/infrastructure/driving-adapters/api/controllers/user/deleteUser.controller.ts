import { Request, Response, NextFunction } from 'express'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'
import { UserDeleterUseCase } from '../../../../../application/usecases/User/UserDeleter'

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id
  const mongoDBUserRepository = new MongoDBUserRepository()
  const userDeleterUseCase = new UserDeleterUseCase(mongoDBUserRepository)
  try {
    await userDeleterUseCase.run(id)
    return
  } catch (error) {
    // evalua middlewares de errores controlados y errores no controlados
    return next(error)
  }
}
