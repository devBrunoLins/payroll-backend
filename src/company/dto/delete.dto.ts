import { IsUUID, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DeleteCompanyDto {
  @ApiProperty({
    description: 'ID único da empresa a ser deletada (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @IsNotEmpty({ message: 'ID da empresa é obrigatório' })
  @IsUUID('4', { message: 'ID da empresa deve ser um UUID válido' })
  id: string
}
