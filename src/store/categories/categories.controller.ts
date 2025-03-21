import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common'
import { CategoriesService } from './categories.service'

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../../auth/guards/roles.guard'
import { Roles } from '../../auth/decorators/roles.decorator'

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

// การใช้งาน Guard และ Decorator
// ในที่นี้เราจะใช้ Guard และ Decorator ในการป้องกันการเข้าถึง API ของเรา
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiTags('categories')
@ApiBearerAuth()

@Controller('store/categories')
export class CategoriesController {

    // Constructor
    constructor(
        private categoyService: CategoriesService
    ) {}

    @ApiOperation({ summary: 'แสดงรายการหมวดหมู่สินค้าทั้งหมด' })
    @ApiResponse({ status: 200, description: 'แสดงรายการหมวดหมู่สินค้าทั้งหมด' })
    // Get all categories
    // GET /store/categories
    @Get('')
    async getCategories() {
        return this.categoyService.getCategories()
    }

    @ApiOperation({ summary: 'ค้นหาหมวดหมู่สินค้า' })
    @ApiResponse({ status: 200, description: 'ค้นหาหมวดหมู่สินค้า' })
    // Search categories
    // GET /store/categories/search?name=Frozen
    @Get('search')
    async searchCategory(@Query('name') name: string) {
        return this.categoyService.searchCategories(name)
    }

    @ApiOperation({ summary: 'แสดงรายการหมวดหมู่สินค้าตาม ID' })
    @ApiResponse({ status: 200, description: 'แสดงรายการหมวดหมู่สินค้าตาม ID' })
    // Get category by ID
    // GET /store/categories/:id
    @Get(':id')
    async getCategory(@Param('id') id: string) {
        return this.categoyService.getCategory(Number(id))
    }

    @ApiOperation({ summary: 'สร้างหมวดหมู่สินค้าใหม่' })
    @ApiResponse({ status: 201, description: 'สร้างหมวดหมู่สินค้าสำเร็จ' })
    // Create category
    // POST /store/categories
    @Post('')
    async createCategory(@Body() data: { name: string }) {
        return this.categoyService.createCategory(data)
    }

    @ApiOperation({ summary: 'แก้ไขหมวดหมู่สินค้าตาม ID' })
    @ApiResponse({ status: 200, description: 'แก้ไขหมวดหมู่สินค้าสำเร็จ' })
    // Update category
    // PUT /store/categories/:id
    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() data: { name: string }) {
        return this.categoyService.updateCategory(Number(id), data)
    }

    @ApiOperation({ summary: 'ลบหมวดหมู่สินค้าตาม ID' })
    @ApiResponse({ status: 200, description: 'ลบหมวดหมู่สินค้าสำเร็จ' })
    // Delete category
    // DELETE /store/categories/:id
    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        return this.categoyService.deleteCategory(Number(id))
    }

}
