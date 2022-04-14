import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRepository'
import { UserNotFoundException } from '../../exceptions/UserNotFoundException'

export class UserGetterByEmail {
  private readonly _userRepository: UserRepository
  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (email: string): Promise<User> {
    const user = await this._userRepository.getByEmail(email)
    if (user === null) {
      throw new UserNotFoundException()
    }
    return user
  }
}
