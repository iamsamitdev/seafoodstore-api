import { Controller, Get } from '@nestjs/common'
import { DataSource  } from 'typeorm'

@Controller('health')
export class HealthController {

    constructor(private dataSource: DataSource) {}

    @Get()
    async checkDBConnection() { 
        try {
            // Check database connection
            await this.dataSource.query('SELECT 1')

            // Raw Query ดึงข้อมูล product จาก schema store
            const products = await this.dataSource.query('SELECT * FROM store.products')

            return {
                status: 'ok',
                message: 'Database connection successful',
                products: products
            }
        } catch (error) {
            return {
                status: 'error',
                message: 'Database connection failed',
                error: error.message
            }
        }
    }

    @Get('products-with-stock')
    async getProductsWithStock() {
        try {
            const sql = `
                SELECT 
                    p.id AS product_id,
                    p.name AS product_name,
                    p.price,
                    s.quantity AS stock_quantity
                FROM 
                    store.products p
                LEFT JOIN 
                    inventory.stocks s 
                ON 
                    p.id = s.product_id
                WHERE 
                    p.deleted_at IS NULL
                LIMIT 10
            `

            const result = await this.dataSource.query(sql)

            return {
                status: 'ok',
                data: result
            }
        }catch (error) {
            return {
                status: 'error',
                message: 'Database connection failed',
                error: error.message
            }
        }
    }

}
