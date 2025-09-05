import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import { PASSWORD_REGEX } from '../constants/password.regex'
import { ApiProperty } from '@nestjs/swagger'

export class SigninDto {

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com.br',
    format: 'email'
  })
  @IsEmail({}, { message: 'e-mail inválido' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Senha123!',
    format: 'password'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'senha deve ter no mínimo 8 caracteres' })
  @Matches(PASSWORD_REGEX, {
    message: 'senha precisa ter maiúscula, minúscula, número e caractere especial'
  })
  password: string
}