import { User } from '../../../domain/entities/User'
import UserModel from '../../driven-adapters/MongoDB/models/UserModel'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export class MongoDBUserRepository implements UserRepository {
  async getAll (): Promise<User[]> {
    const users = await UserModel.find()
    return users
  }

  async save (user: User): Promise<User> {
    const newUser = new UserModel({
      id: user.id,
      name: user.name,
      username: user.username,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      city: user.city,
      province: user.province
    })
    await newUser.save()
    return user
  }

  async update (user: User): Promise<User> {
    const updatedUser = await UserModel.updateOne(
      { id: user.id },
      {
        name: user.name,
        username: user.username,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        city: user.city,
        province: user.province
      }, { new: true })
    console.log('updatedUser---------------', updatedUser)
    return user
  }

  async delete (user: User): Promise<void> {
    await UserModel.findOneAndDelete({ id: user.id })
  }

  async getByUserName (username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username })
    return user
  }

  async getById (id: string): Promise<User | null> {
    const user = await UserModel.findOne({ id })
    return user
  }
}
