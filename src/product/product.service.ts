import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productsRepository.findOne(id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    let toUpdate = await this.productsRepository.findOne(id);
    let updated = Object.assign(toUpdate, updateProductDto);

    return await this.productsRepository.save(updated);
  }

  async remove(id: number): Promise<Product> {
    let toRemove = await this.productsRepository.findOne(id);
    let removedProducts = await this.productsRepository.remove(
      new Array(toRemove),
    );

    return removedProducts[0];
  }
}
