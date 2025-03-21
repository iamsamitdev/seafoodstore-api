import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Supplier } from '../entities/suppliers.entity'
import { CreateSupplierDto } from '../dto/create-supplier.dto'
import { UpdateSupplierDto } from '../dto/update-supplier.dto'

@Injectable()
export class SuppliersService {

    // สร้าง constructor และใช้ @InjectRepository ในการ inject Repository ของ Supplier
    constructor(
        @InjectRepository(Supplier)
        private suppliersRepository: Repository<Supplier>,
    ) {}
    
    // สร้าง method create สำหรับสร้าง Supplier ใหม่
    async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
        const supplier = this.suppliersRepository.create(createSupplierDto)
        return this.suppliersRepository.save(supplier)
    }
    
    // สร้าง method findAll สำหรับค้นหา Supplier ทั้งหมด
    async findAll(): Promise<Supplier[]> {
        return this.suppliersRepository.find({
            relations: ['products'],
        })
    }
    
    // สร้าง method findOne สำหรับค้นหา Supplier ด้วย ID
    async findOne(id: number): Promise<Supplier> {
        const supplier = await this.suppliersRepository.findOne({
             where: { id },
                relations: ['products'],
        })
        if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${id} not found`)
        }
        return supplier
    }
    
    // สร้าง method update สำหรับอัพเดท Supplier ด้วย ID
    async update(
        id: number,
        updateSupplierDto: UpdateSupplierDto,
    ): Promise<Supplier> {
        const supplier = await this.findOne(id)
        this.suppliersRepository.merge(supplier, updateSupplierDto)
        return this.suppliersRepository.save(supplier)
    }
    
    // สร้าง method remove สำหรับลบ Supplier
    async remove(id: number): Promise<void> {
        await this.findOne(id)
        await this.suppliersRepository.softDelete(id)
    }

}
