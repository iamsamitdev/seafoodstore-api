import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

    private products:any = [
        { id: '1', name: 'Product 1', description: 'Description 1', price: 100 },
        { id: '2', name: 'Product 2', description: 'Description 2', price: 200 },
        { id: '3', name: 'Product 3', description: 'Description 3', price: 300 },
        { id: '4', name: 'Product 4', description: 'Description 4', price: 400 },
        { id: '5', name: 'Product 5', description: 'Description 5', price: 500 }
    ]

    findAll() {
        // Sort products by id descending
        return this.products.sort((a, b) => b.id - a.id)
    }

    findOne(id: string) {
        return this.products.find(p => p.id === id)
    }

    create(product: any) {
        const newProduct = { id: Date.now().toString(), ...product }
        this.products.push(newProduct)
        return newProduct
    }
}
