import { prop, getModelForClass } from '@typegoose/typegoose'
import { User } from '../../../../domain/entities/User'
class Users implements User {
  @prop({ required: true }) // propiedades de mongoose
  id!: string // tipos de datos typescript

  @prop({ trim: true })
  name?: string

  @prop({ trim: true })
  lastname?: string

  @prop({ trim: true })
  username?: string

  @prop({ trim: true })
  email?: string

  @prop({ trim: true })
  password?: string

  @prop({ trim: true })
  city?: string

  @prop({ trim: true })
  province?: string
}
const UserModel = getModelForClass(Users)
export default UserModel
