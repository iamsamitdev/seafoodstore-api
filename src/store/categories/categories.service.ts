import { Injectable, NotFoundException } from '@nestjs/common'
import { Category } from '../entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'

@Injectable()
export class CategoriesService {

        // Constructor
        constructor(
            @InjectRepository(Category) private categoryRepo: Repository<Category>
        ) {}
    
        // Get all categories
        async getCategories() {
            // SELECT * FROM store.categories
            return this.categoryRepo.find() 
        }
    
        // Search categories
        async searchCategories(query: string) {
            // SELECT * FROM store.categories WHERE name ILIKE $1
            return this.categoryRepo.find({
                where: { name: ILike(`%${query}%`) }
            })
        }
    
        // Get category by ID
        async getCategory(id: number) {
            // SELECT * FROM store.categories WHERE id = $1
            const category = await this.categoryRepo.findOne({ where: { id } })
    
            if (!category) {
                throw new NotFoundException(`Category id ${id} not found`)
            }
    
            return category
        }
    
        // Create category
        async createCategory(data: { name: string }) {
            // INSERT INTO store.categories (name) VALUES ($1)
            const category = this.categoryRepo.create({ name: data.name })
            return this.categoryRepo.save(category)
        }
    
        // Update category
        async updateCategory(id: number, data: { name: string }) {
            // UPDATE store.categories SET name = $1 WHERE id = $2
            const category = await this.categoryRepo.findOne({ where: { id } })
    
            if (!category) {
                throw new NotFoundException(`Category id ${id} not found`)
            }
    
            category.name = data.name
            return this.categoryRepo.save(category)
        }
    
        // Delete category
        async deleteCategory(id: number) {
            // DELETE FROM store.categories WHERE id = $1
            const category = await this.getCategory(id)
    
            if (!category) {
                throw new NotFoundException(`Category id ${id} not found`)
            }
    
            return this.categoryRepo.remove(category)
        }
    

}
