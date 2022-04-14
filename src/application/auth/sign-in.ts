/* import { Config } from '../../infrastructure/driving-adapters/config/env'
import { User } from '../../domain/entities/User'
import { UserRepository } from '../../domain/repositories/UserRepository'

class SignInUC {
  private readonly _userRepository: UserRepository
  private readonly jwt
  private readonly bcrypt
  constructor (userRepository: UserRepository, jwt: any, bcrypt: any) {
    this._userRepository = userRepository
    this.jwt = jwt
    this.bcrypt = bcrypt
  }

  async signIn (userInfo) {
    const user = await this._userRepository.getByEmail(userInfo.email)
  }
}
*/
