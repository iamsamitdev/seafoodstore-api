// src/store/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm'
import { Category } from './category.entity'
import { Supplier } from './suppliers.entity'

@Entity('store.products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'numeric' })
  price: number

  @Column({ name: 'category_id' })
  categoryId: number

  @Column({ name: 'supplier_id' })
  supplierId: number

  @Column({ name: 'status', default: "active" })
  status: string

  @Column({ name: 'details', type: 'jsonb' })
  details: Record<string, any>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToOne(() => Supplier, supplier => supplier.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier
}
