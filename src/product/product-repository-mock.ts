import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
export class ProductRepositoryMock {
  create(createProductDto: CreateProductDto): Promise<Product> {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...createProductDto,
    });
  }
  save(product: Product): Promise<Product> {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...product,
    });
  }
}
