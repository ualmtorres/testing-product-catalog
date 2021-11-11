import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export class ProductServiceMock {
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...createProductDto,
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return Promise.resolve({
      id: id,
      ...updateProductDto,
    });
  }
}
