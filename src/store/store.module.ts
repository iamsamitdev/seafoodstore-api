import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Categories
import { CategoriesController } from './categories/categories.controller'
import { CategoriesService } from './categories/categories.service'
import { Category } from './entities/category.entity'

// Products
import { ProductsController } from './products/products.controller'
import { ProductsService } from './products/products.service'
import { Product } from './entities/product.entity'

// Suppliers
import { SuppliersController } from './suppliers/suppliers.controller'
import { SuppliersService } from './suppliers/suppliers.service'
import { Supplier } from './entities/suppliers.entity'


@Module({
    imports: [TypeOrmModule.forFeature([Category, Product, Supplier])],
    controllers: [CategoriesController, ProductsController, SuppliersController],
    providers: [CategoriesService, ProductsService, SuppliersService],
    exports: [CategoriesService, ProductsService, SuppliersService],
})
export class StoreModule {
        
}
