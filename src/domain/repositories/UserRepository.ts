import { User } from '../entities/User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  update: (user: User) => Promise<User>
  delete: (user: User) => Promise<void>
  getByUserName: (username: string) => Promise<User | null>
  getById: (id: string) => Promise<User | null>
}
