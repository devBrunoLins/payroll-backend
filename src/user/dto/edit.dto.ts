import { IsEmail, IsString, IsBoolean, IsOptional, IsIn, MinLength, IsNotEmpty, IsUUID } from 'class-validator'

export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name?: string

  @IsOptional()
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password?: string

  @IsOptional()
  @IsIn(['RH_ADMIN', 'RH_USER'], { message: 'Role deve ser RH_ADMIN ou RH_USER' })
  role?: 'RH_ADMIN' | 'RH_USER'

  @IsOptional()
  @IsBoolean()
  is_active?: boolean
}
