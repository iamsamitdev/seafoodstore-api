import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../../auth/guards/roles.guard'
import { Roles } from '../../auth/decorators/roles.decorator'

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

// การใช้งาน Guard และ Decorator
// ในที่นี้เราจะใช้ Guard และ Decorator ในการป้องกันการเข้าถึง API ของเรา
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiTags('products')
@ApiBearerAuth()

@Controller('store/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'สร้างสินค้าใหม่' })
  @ApiResponse({ status: 201, description: 'สร้างสินค้าสำเร็จ' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @ApiOperation({ summary: 'แสดงรายการสินค้าทั้งหมด' })
  @ApiResponse({ status: 200, description: 'แสดงรายการสินค้าทั้งหมด' })
  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @ApiOperation({ summary: 'แสดงรายการสินค้าตาม ID' })
  @ApiResponse({ status: 200, description: 'แสดงรายการสินค้าตาม ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @ApiOperation({ summary: 'แก้ไขรายการสินค้าตาม ID' })
  @ApiResponse({ status: 200, description: 'แก้ไขรายการสินค้าสำเร็จ' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @ApiOperation({ summary: 'ลบรายการสินค้าตาม ID' })
  @ApiResponse({ status: 200, description: 'ลบรายการสินค้าสำเร็จ' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
