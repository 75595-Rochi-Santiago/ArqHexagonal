import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'
import { User } from '../../../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'
import { MongoDB } from '../../../../../infrastructure/driven-adapters/MongoDB'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const db = new MongoDB()
  await db.connectDB()
  const {
    username,
    age,
    name
  } = req.body
  const mongoDBUserRepository = new MongoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(mongoDBUserRepository)

  const userToCreate: User = {
    id: uuidv4(),
    name,
    username,
    age
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
