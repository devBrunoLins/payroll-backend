import { IsString, IsNotEmpty, IsDateString, Matches, MinLength, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EditDependentsDto {

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
    description: 'CPF do dependente',
    example: '12345678900',
    minLength: 2
  })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { 
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX' 
  })
  cpf: string

  @ApiProperty({
    description: 'RG do dependente',
    example: '123456789',
    minLength: 9
  })
  @IsNotEmpty({ message: 'RG é obrigatório' })
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}$/, { 
    message: 'RG deve estar no formato XXXXXXXXX' 
  })
  rg: string

  @ApiProperty({
    description: 'Data de nascimento do dependente',
    example: '2024-01-15',
    format: 'date',
  })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @IsDateString({}, { message: 'Data de nascimento deve estar no formato YYYY-MM-DD' })
  birth_date: string

  @ApiProperty({
      description: 'ID do funcionário dono deste dependente',
      example: '123e4567-e89b-12d3-a456-426614174000',
      format: 'uuid'
    })
  @IsNotEmpty({ message: 'ID do funcionário é obrigatório' })
  @IsUUID('4', { message: 'ID do funcionário deve ser um UUID válido' })
  employee_id: string
}