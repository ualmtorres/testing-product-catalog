import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'the-product' })
  readonly name: string;

  @ApiProperty({ example: 'the-brand' })
  readonly brand: string;

  @ApiProperty({ example: 'the-category' })
  readonly category: string;

  @ApiProperty({ example: 99 })
  readonly price: number;

  @ApiProperty({ example: 'http://product.com/the-product' })
  readonly url: string;
}
