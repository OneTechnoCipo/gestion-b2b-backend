import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name!: string;

  @IsString({ message: 'El taxId debe ser un texto.' })
  @IsNotEmpty({ message: 'El taxId (CUIT) es obligatorio.' })
  taxId!: string;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  address!: string;

  @IsString({ message: 'El teléfono debe ser un texto.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  phone!: string;
}

export class UpdateCompanyDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'El taxId debe ser un texto.' })
  @IsOptional()
  taxId?: string;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'El teléfono debe ser un texto.' })
  @IsOptional()
  phone?: string;

  @IsBoolean({ message: 'isActive debe ser un booleano (true/false).' })
  @IsOptional()
  isActive?: boolean;
}