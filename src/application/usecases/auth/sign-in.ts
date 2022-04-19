import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import bcrypt from 'bcrypt'
import { UserGetterByEmail } from '../../../domain/services/UserGetterByEmail'
import { JWTManager } from '../../../infrastructure/driving-adapters/api/security/jwt-manager'
import {
  UnauthorizedError,
  NotFoundError,
  RequiredParamError
} from '../../../domain/exceptions/errors'

export class SignInUseCase {
  private readonly _userGetterByEmail: UserGetterByEmail
  constructor (userRepository: UserRepository) {
    this._userGetterByEmail = new UserGetterByEmail(userRepository)
  }

  async run (data: User): Promise<string | Error> {
    if (data.email !== undefined && data.password !== undefined) {
      const user = await this._userGetterByEmail.run(data.email)
      if (user !== null && user !== undefined) {
        if (user.password !== undefined && user._id !== undefined) {
          try {
            const validate = await this.compare(data.password, user.password)
            if (validate) {
              const token = await JWTManager.generateJWT(user._id.toString())
              return token
            } else {
              throw new UnauthorizedError('Unauthorized', 'incorrect pass')
            }
          } catch (error) {
            throw new UnauthorizedError('Unauthorized', 'incorrect pass')
          }
        } else {
          throw new NotFoundError('Unauthorized', 'pass undefined')
        }
      } else {
        throw new NotFoundError('Unauthorized', 'user not found')
      }
    } else {
      throw new RequiredParamError('Email', 'Email is required')
    }
  }

  async compare (userPass: string, encrypPass: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      bcrypt.compare(userPass, encrypPass).then(function (result) {
        resolve(result)
      }).catch(reject)
    })
  }
}
