import { IsString, IsOptional, IsDateString, Matches, MinLength, IsNotEmpty, IsUUID, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EditEmployeeDto {
  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'Maria Silva Santos',
    minLength: 2,
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Nome completo deve ter pelo menos 2 caracteres' })
  full_name?: string

  @ApiProperty({
    description: 'CPF do funcionário no formato brasileiro',
    example: '987.654.321-00',
    pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$',
    required: false
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { 
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX' 
  })
  cpf?: string

  @ApiProperty({
    description: 'Data de admissão do funcionário',
    example: '2024-02-01',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de admissão deve estar no formato YYYY-MM-DD' })
  admission_date?: string

  @ApiProperty({
    description: 'Data de demissão do funcionário',
    example: '2024-11-30',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de demissão deve estar no formato YYYY-MM-DD' })
  termination_date?: string

  @ApiProperty({
    description: 'Salário do funcionário',
    example: 1570.00,
    format: 'number'
  })
  @IsNotEmpty({ message: 'Salário é obrigatório' })
  @IsNumber()
  salary: number
}
