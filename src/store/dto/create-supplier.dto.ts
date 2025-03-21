// src/store/dto/create-supplier.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  contactInfo: string;
}