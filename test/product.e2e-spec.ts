import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../src/product/entities/product.entity';
import { ProductModule } from '../src/product/product.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  const mockProductRepository = {
    find: jest.fn(),
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
    return request(app.getHttpServer()).get('/product').expect(200);
  });
});
