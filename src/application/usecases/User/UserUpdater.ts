import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterByEmail } from '../../../domain/services/UserGetterByEmail'

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterByEmail: UserGetterByEmail

  // dependency inyeccion ->constructor(userRepository:UserRepository)
  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterByEmail = new UserGetterByEmail(userRepository)
  }

  async run (data: User): Promise<User | string> {
    console.log('antes if')
    if (data.email !== null && data.email !== undefined) {
      console.log('en if', data.email)
      const user = await this._userGetterByEmail.run(data.email)
      console.log('user finded', user)
      const dataToUpdate: User = {
        name: data.name ?? user.name,
        lastname: data.lastname ?? user.lastname,
        username: data.username ?? user.username,
        email: data.email ?? user.email,
        password: data.password ?? user.password,
        city: data.city ?? user.city,
        province: data.province ?? user.province
      }
      const userUpdated: User = await this._userRepository.update(
        dataToUpdate
      )
      return userUpdated
    } else {
      return 'Email required'
    }
  }
}
