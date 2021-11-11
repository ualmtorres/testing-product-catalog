import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepositoryMock } from './product-repository-mock';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: ProductRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = {
      name: 'the-product',
      brand: 'the-brand',
      category: 'the-category',
      price: 10,
      url: 'http://product.com/the-product',
    };

    expect(await service.create(createProductDto)).toEqual({
      id: expect.any(Number),
      ...createProductDto,
    });
  });
});
