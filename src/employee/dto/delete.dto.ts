import { IsUUID, IsNotEmpty } from 'class-validator'

export class DeleteEmployeeDto {
  @IsNotEmpty({ message: 'ID do funcionário é obrigatório' })
  @IsUUID('4', { message: 'ID do funcionário deve ser um UUID válido' })
  id: string
}
