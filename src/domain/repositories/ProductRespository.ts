import { Product } from '../entities/Product'

export interface ProductRepository {
  save: (user: Product) => Promise<Product>
  update: (user: Product) => Promise<Product>
  delete: (user: Product) => Promise<void>
  getByName: (name: string) => Promise<Product | null>
  getByCategory: (category: string) => Promise<Product | null>
}
