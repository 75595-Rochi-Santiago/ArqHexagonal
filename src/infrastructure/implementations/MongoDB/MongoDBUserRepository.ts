import { User } from '../../../domain/entities/User'
import UserModel from '../../driven-adapters/MongoDB/models/UserModel'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import bcrypt from 'bcrypt'

export class MongoDBUserRepository implements UserRepository {
  async getAll (): Promise<User[]> {
    const users = await UserModel.find()
    return users
  }

  async save (user: User): Promise<User> {
    if (user.password !== undefined) {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(user.password, salt)
      const newUser = new UserModel({
        name: user.name,
        username: user.username,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        city: user.city,
        province: user.province
      })
      await newUser.save()
    }
    return user
  }

  async update (user: User): Promise<User > {
    if (user.password !== undefined) {
      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err != null) { throw new Error() }
        user.password = hash
      })
      const updatedUser = await UserModel.updateOne(
        { email: user.email },
        {
          name: user.name,
          username: user.username,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          city: user.city,
          province: user.province
        },
        { new: true }
      )
      console.log('updatedUser---------------', updatedUser)
    }
    return user
  }

  async delete (id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id)
  }

  async getByUserName (username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username })
    return user
  }

  async getById (id: string): Promise<User | null> {
    const user = await UserModel.findOne({ id })
    return user
  }

  async getByEmail (email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email })
    console.log('user...', user?._id.toString())
    return user
  }
}
