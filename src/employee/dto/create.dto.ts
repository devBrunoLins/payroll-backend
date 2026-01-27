import { IsString, IsNotEmpty, IsOptional, IsDateString, Matches, MinLength, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateEmployeeDto {

  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João Silva Santos',
    minLength: 2
  })
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @IsString()
  @MinLength(2, { message: 'Nome completo deve ter pelo menos 2 caracteres' })
  full_name: string

  @ApiProperty({
    description: 'Nome da mãe do funcionário',
    example: 'Maria da Silva Santos',
    minLength: 5
  })
  @IsNotEmpty({ message: 'Nome da mãe é obrigatório' })
  @IsString()
  @MinLength(5, { message: 'Nome da mãe deve ter pelo menos 5 caracteres' })
  mother_name: string

  @ApiProperty({
    description: 'Nome do pai do funcionário',
    example: 'João da Silva Santos',
    minLength: 5
  })
  @IsNotEmpty({ message: 'Nome do pai é obrigatório' })
  @IsString()
  @MinLength(5, { message: 'Nome do pai deve ter pelo menos 5 caracteres' })
  father_name: string

  @ApiProperty({
    description: 'CPF do funcionário no formato brasileiro',
    example: '12345678900',
    pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$'
  })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { 
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX' 
  })
  cpf: string

  @ApiProperty({
    description: 'Data de admissão do funcionário',
    example: '2024-01-15',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de admissão deve estar no formato YYYY-MM-DD' })
  admission_date?: string

  @ApiProperty({
    description: 'Salário do funcionário',
    example: 1570.00,
    format: 'number'
  })
  @IsNotEmpty({ message: 'Salário é obrigatório' })
  @IsNumber()
  salary: number
}