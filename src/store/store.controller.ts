import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common'
import { StoreService } from './store.service'

@Controller('store')
export class StoreController {

    // Constructor
    constructor(
        private storeService: StoreService
    ) {}

    // Get all categories
    // GET /store/categories
    @Get('categories')
    async getCategories() {
        return this.storeService.getCategories()
    }

    // Search categories
    // GET /store/categories/search?name=Frozen
    @Get('categories/search')
    async searchCategory(@Query('name') name: string) {
        return this.storeService.searchCategories(name)
    }

    // Get category by ID
    // GET /store/categories/:id
    @Get('categories/:id')
    async getCategory(@Param('id') id: string) {
        return this.storeService.getCategory(Number(id))
    }

    // Create category
    // POST /store/categories
    @Post('categories')
    async createCategory(@Body() data: { name: string }) {
        return this.storeService.createCategory(data)
    }

    // Update category
    // PUT /store/categories/:id
    @Put('categories/:id')
    async updateCategory(@Param('id') id: string, @Body() data: { name: string }) {
        return this.storeService.updateCategory(Number(id), data)
    }

    // Delete category
    // DELETE /store/categories/:id
    @Delete('categories/:id')
    async deleteCategory(@Param('id') id: string) {
        return this.storeService.deleteCategory(Number(id))
    }

}
