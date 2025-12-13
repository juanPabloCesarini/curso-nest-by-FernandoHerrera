import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
     private readonly productRepository: Repository<Product>) {

  }
  async create(createProductDto: CreateProductDto) {

    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;   
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id});
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`); 
    await this.productRepository.remove(product);
    return `This action removes a #${id} product`;
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' ) {
      throw new BadRequestException(error.detail);
    }
    this.logger.error( error );
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
