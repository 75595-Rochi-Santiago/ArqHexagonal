import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

export class UserDeleterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  // dependency inyeccion ->constructor(userRepository:UserRepository)
  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (userId: string): Promise<User> {
    const userToDelete = await this._userGetterById.run(userId)
    console.log('user to delete: ', userToDelete)
    await this._userRepository.delete(userId)
    return userToDelete
  }
}
