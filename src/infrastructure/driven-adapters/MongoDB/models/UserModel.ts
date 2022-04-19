import { prop, getModelForClass } from '@typegoose/typegoose'
import { User } from '../../../../domain/entities/User'
import Joi from 'joi'
export class Users implements User {
  // @prop({ required: true }) // propiedades de mongoose
  // id!: string // tipos de datos typescript

  @prop({ required: true, trim: true })
  name?: string

  @prop({ required: true, trim: true })
  lastname?: string

  @prop({ required: true, trim: true })
  username?: string

  @prop({ required: true, trim: true })
  email?: string

  @prop({ required: true, trim: true })
  password?: string

  @prop({ required: true, trim: true })
  city?: string

  @prop({ required: true, trim: true })
  province?: string

  static async validate (user: User, required = true): Promise<boolean> {
    const userSchema = Joi.object({
      name: required
        ? Joi.string().alphanum().required()
        : Joi.string().alphanum(),
      lastname: required
        ? Joi.string().alphanum().required()
        : Joi.string().alphanum(),
      username: required
        ? Joi.string().alphanum().required()
        : Joi.string().alphanum(),
      email: required ? Joi.string().email().required() : Joi.string().email(),
      password: required
        ? Joi.string().alphanum().required()
        : Joi.string().alphanum(),
      city: required
        ? Joi.string().alphanum().required()
        : Joi.string().alphanum(),
      province: required
        ? Joi.string().alphanum().required()
        : Joi.string().alphanum()
    })
    const { error } = userSchema.validate(user)

    if (error != null) {
      console.log(error)
      return false
    } else {
      return true
    }
  }
}
const UserModel = getModelForClass(Users)
export default UserModel
