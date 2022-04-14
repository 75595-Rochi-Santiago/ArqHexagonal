import { Product } from '../../../domain/entities/Product'
import { ProductRepository } from '../../../domain/repositories/ProductRespository'

export class UserCreatorUseCase {
  private readonly _ProductRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    // inyeccion de dependencia
    this._ProductRepository = productRepository
  }

  async run (body: Product): Promise<Product> {
    const productCreated: Product = await this._ProductRepository.save(body)

    return productCreated
  }
}
