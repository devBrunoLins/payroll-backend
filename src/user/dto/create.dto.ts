import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUUID, IsIn, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'ID único da empresa (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @IsNotEmpty({ message: 'ID da empresa é obrigatório' })
  @IsUUID('4', { message: 'ID da empresa deve ser um UUID válido' })
  company_id: string

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva Santos',
    minLength: 2
  })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name: string

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com.br',
    format: 'email'
  })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'MinhaSenh@123',
    minLength: 6,
    format: 'password'
  })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string

  @ApiProperty({
    description: 'Papel do usuário no sistema',
    example: 'RH_USER',
    enum: ['RH_ADMIN', 'RH_USER'],
    default: 'RH_USER',
    required: false
  })
  @IsOptional()
  @IsIn(['RH_ADMIN', 'RH_USER'], { message: 'Role deve ser RH_ADMIN ou RH_USER' })
  role?: 'RH_ADMIN' | 'RH_USER'

  @ApiProperty({
    description: 'Status ativo do usuário',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  is_active?: boolean
}