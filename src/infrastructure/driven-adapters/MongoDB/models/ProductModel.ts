import { prop, getModelForClass } from '@typegoose/typegoose'
import { Product } from '../../../../domain/entities/Product'
class Products implements Product {
  @prop({ required: true }) // propiedades de mongoose
  id!: string // tipos de datos typescript

  @prop({ trim: true })
  name?: string

  @prop()
  description?: string

  @prop()
  category?: string

  @prop()
  price?: number

  @prop()
  image?: string
}
const ProductModel = getModelForClass(Products)
export default ProductModel
