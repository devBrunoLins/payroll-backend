import { IsString, IsNotEmpty, IsOptional, IsDateString, IsUUID, Matches, MinLength } from 'class-validator'

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'ID da empresa é obrigatório' })
  @IsUUID('4', { message: 'ID da empresa deve ser um UUID válido' })
  company_id: string

  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @IsString()
  @MinLength(2, { message: 'Nome completo deve ter pelo menos 2 caracteres' })
  full_name: string

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { 
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX' 
  })
  cpf: string

  @IsOptional()
  @IsDateString({}, { message: 'Data de admissão deve estar no formato YYYY-MM-DD' })
  admission_date?: string

  @IsOptional()
  @IsDateString({}, { message: 'Data de demissão deve estar no formato YYYY-MM-DD' })
  termination_date?: string
}