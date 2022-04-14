import { User } from '../entities/User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  update: (user: User) => Promise<User>
  delete: (id: string) => Promise<void>
  getByUserName: (username: string) => Promise<User | null>
  getById: (id: string) => Promise<User | null>
  getByEmail: (email: string) => Promise<User | null>
}
