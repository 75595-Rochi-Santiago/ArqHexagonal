import { Request, Response, NextFunction } from 'express'
import { User } from '../../../../../domain/entities/User'
import { SignInUseCase } from '../../../../../application/usecases/auth/sign-in'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body
  const mongoDBUserRepository = new MongoDBUserRepository()
  const signInUseCase = new SignInUseCase(mongoDBUserRepository)

  const userToSignIn: User = {
    email,
    password
  }
  console.log('userToSignIn: ', userToSignIn)
  try {
    const userSignIn = await signInUseCase.run(userToSignIn)

    res.json(userSignIn)
    return
  } catch (error) {
    // evalua middlewares de errores controlados y errores no controlados
    console.log('catch', error)
    return next(error)
  }
}
