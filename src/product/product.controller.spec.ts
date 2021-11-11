import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let mockProductService = {
    create: jest.fn((dto) => {
      return {
        id: Math.random() * (1000 - 1) + 1,
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id: id,
        ...dto,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', () => {
    const createProductDto = {
      name: 'the-product',
      brand: 'the-brand',
      category: 'the-category',
      price: 10,
      url: 'http://product.com/the-product',
    };

    expect(controller.create(createProductDto)).toEqual({
      id: expect.any(Number),
      ...createProductDto,
    });
  });

  it('should update a product', () => {
    const updateProductDto = {
      name: 'new-product',
      brand: 'new-brand',
      category: 'new-category',
      price: 100,
      url: 'http://product.com/the-new-product',
    };
    const productId = 2;

    expect(controller.update(productId, updateProductDto)).toEqual({
      id: productId,
      ...updateProductDto,
    });

    expect(mockProductService.update).toHaveBeenCalledWith(
      productId,
      updateProductDto,
    );
  });
});
