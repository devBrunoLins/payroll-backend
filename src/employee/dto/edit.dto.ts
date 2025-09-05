import { IsString, IsOptional, IsDateString, Matches, MinLength, IsNotEmpty, IsUUID } from 'class-validator'

export class EditEmployeeDto {
  @IsNotEmpty({ message: 'ID do funcionário é obrigatório' })
  @IsUUID('4', { message: 'ID do funcionário deve ser um UUID válido' })
  id: string

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Nome completo deve ter pelo menos 2 caracteres' })
  full_name?: string

  @IsOptional()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { 
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX' 
  })
  cpf?: string

  @IsOptional()
  @IsDateString({}, { message: 'Data de admissão deve estar no formato YYYY-MM-DD' })
  admission_date?: string

  @IsOptional()
  @IsDateString({}, { message: 'Data de demissão deve estar no formato YYYY-MM-DD' })
  termination_date?: string
}
