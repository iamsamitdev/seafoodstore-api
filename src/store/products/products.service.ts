import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {

  // สร้าง constructor และใช้ @InjectRepository ในการ inject Repository ของ Product
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // สร้าง method create สำหรับสร้าง Product ใหม่
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  // สร้าง method findAll สำหรับค้นหา Product ทั้งหมด
  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['category', 'supplier'],
    });
  }

  // สร้าง method findOne สำหรับค้นหา Product ด้วย ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'supplier'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // สร้าง method update สำหรับอัพเดท Product ด้วย ID
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  // สร้าง method remove สำหรับลบ Product
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productsRepository.softDelete(id);
  }

}
