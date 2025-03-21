import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service'
import { CreateSupplierDto } from '../dto/create-supplier.dto'
import { UpdateSupplierDto } from '../dto/update-supplier.dto'

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../../auth/guards/roles.guard'
import { Roles } from '../../auth/decorators/roles.decorator'

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

// การใช้งาน Guard และ Decorator
// ในที่นี้เราจะใช้ Guard และ Decorator ในการป้องกันการเข้าถึง API ของเรา
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiTags('suppliers')
@ApiBearerAuth()

@Controller('store/suppliers')
export class SuppliersController {

    constructor(private readonly suppliersService: SuppliersService) {}
    
    @ApiOperation({ summary: 'สร้าง Supplier ใหม่' })
    @ApiResponse({ status: 201, description: 'สร้าง Supplier สำเร็จ' })
    @Post()
    create(@Body() createSupplierDto: CreateSupplierDto) {
        return this.suppliersService.create(createSupplierDto);
    }
    
    @ApiOperation({ summary: 'แสดงรายการ Supplier ทั้งหมด' })
    @ApiResponse({ status: 200, description: 'แสดงรายการ Supplier ทั้งหมด' })
    @Get()
    findAll() {
        return this.suppliersService.findAll();
    }
    
    @ApiOperation({ summary: 'แสดงรายการ Supplier ตาม ID' })
    @ApiResponse({ status: 200, description: 'แสดงรายการ Supplier ตาม ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.suppliersService.findOne(+id);
    }
    
    @ApiOperation({ summary: 'แก้ไข Supplier ตาม ID' })
    @ApiResponse({ status: 200, description: 'แก้ไข Supplier สำเร็จ' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
        return this.suppliersService.update(+id, updateSupplierDto);
    }
    
    @ApiOperation({ summary: 'ลบ Supplier ตาม ID' })
    @ApiResponse({ status: 200, description: 'ลบ Supplier สำเร็จ' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.suppliersService.remove(+id);
    }
}
