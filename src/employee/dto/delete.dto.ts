import { IsUUID, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DeleteEmployeeDto {
  @ApiProperty({
    description: 'ID único do funcionário a ser deletado (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @IsNotEmpty({ message: 'ID do funcionário é obrigatório' })
  @IsUUID('4', { message: 'ID do funcionário deve ser um UUID válido' })
  id: string
}
