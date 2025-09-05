import { IsString, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Tech Solutions Ltda',
    minLength: 2
  })
  @IsNotEmpty({ message: 'Nome da empresa é obrigatório' })
  @IsString()
  @MinLength(2, { message: 'Nome da empresa deve ter pelo menos 2 caracteres' })
  name: string

  @ApiProperty({
    description: 'Slug único da empresa para URLs amigáveis',
    example: 'tech-solutions',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Slug deve ter pelo menos 2 caracteres' })
  slug?: string

  @ApiProperty({
    description: 'CNPJ da empresa no formato brasileiro',
    example: '12345678000190',
    pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$',
    required: false
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { 
    message: 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX' 
  })
  cnpj?: string
}
