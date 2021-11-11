import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductServiceMock } from './product-service-mock';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const ProductServiceProvider = {
      provide: ProductService,
      useClass: ProductServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, ProductServiceProvider],
    })
      .overrideProvider(ProductService)
      .useClass(ProductServiceMock)
      .compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = {
      name: 'the-product',
      brand: 'the-brand',
      category: 'the-category',
      price: 10,
      url: 'http://product.com/the-product',
    };

    expect(await controller.create(createProductDto)).toEqual({
      id: expect.any(Number),
      ...createProductDto,
    });
  });

  it('should update a product', async () => {
    const updateProductDto = {
      name: 'new-product',
      brand: 'new-brand',
      category: 'new-category',
      price: 100,
      url: 'http://product.com/the-new-product',
    };
    const productId = 2;

    expect(await controller.update(productId, updateProductDto)).toEqual({
      id: productId,
      ...updateProductDto,
    });

    const updateSpy = jest.spyOn(service, 'update');
    controller.update(productId, updateProductDto);

    expect(updateSpy).toHaveBeenCalledWith(productId, updateProductDto);
  });
});
