import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UserAlreadyExistsException } from '../../../domain/exceptions/UserAlreadyExistsException'
import { MissingFieldsException } from '../../../domain/exceptions/MissingFieldsException'

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) { // inyeccion de dependencia
    this._userRepository = userRepository
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (body: User): Promise<User> {
    if (body.username === undefined) throw new MissingFieldsException()
    const existUser: boolean = await this._existUserByUserName.run(body.username)
    if (existUser) throw new UserAlreadyExistsException()

    const userCreated: User = await this._userRepository.save(body)

    return userCreated
  }
}
