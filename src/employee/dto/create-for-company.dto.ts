import { IsString, IsNotEmpty, IsOptional, IsDateString, Matches, MinLength, IsNumber, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateEmployeeDto {

  @ApiProperty({
    description: 'ID da empresa à qual o funcionário pertence',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsNotEmpty({ message: 'ID da empresa é obrigatório' })
  @IsUUID('4', { message: 'ID da empresa deve ser um UUID válido' })
  company_id: string

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

  @ApiProperty({
    description: 'Nome da mãe do funcionário',
    example: 'Maria da Silva Santos',
    nullable: false
  })
  @IsNotEmpty({ message: 'Nome da mãe é obrigatório' })
  @IsString()
  mother_name: string

  @ApiProperty({
    description: 'Nome do pai do funcionário',
    example: 'João da Silva Santos',
    nullable: false
  })
  @IsNotEmpty({ message: 'Nome do pai é obrigatório' })
  @IsString()
  father_name: string
}