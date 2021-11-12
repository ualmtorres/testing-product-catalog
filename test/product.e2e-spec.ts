import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../src/product/entities/product.entity';
import { ProductModule } from '../src/product/product.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  const mockProducts = [
    {
      id: 1,
      name: 'the-product-1',
      brand: 'the-brand-1',
      category: 'the-category-1',
      price: 10,
      url: 'http://product.com/the-product-1',
    },
    {
      id: 2,
      name: 'the-product-2',
      brand: 'the-brand-2',
      category: 'the-category-2',
      price: 20,
      url: 'http://product.com/the-product-2',
    },
  ];

  const mockProductRepository = {
    find: jest.fn().mockImplementation(() => {
      return mockProducts;
    }),

    create: jest.fn().mockImplementation((dto) => {
      return {
        id: Math.random() * (1000 - 1) + 1,
        ...dto,
      };
    }),

    save: jest
      .fn()
      .mockImplementation((newProduct) => Promise.resolve(newProduct)),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(getRepositoryToken(Product))
      .useValue(mockProductRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(mockProducts);
  });

  it('/users (POST)', () => {
    const createProductDto = {
      name: 'the-product',
      brand: 'the-brand',
      category: 'the-category',
      price: 10,
      url: 'http://product.com/the-product',
    };

    return request(app.getHttpServer())
      .post('/product')
      .send(createProductDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...createProductDto,
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
