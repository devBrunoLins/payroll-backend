import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import { PASSWORD_REGEX } from '../constants/password.regex'

export class SigninDto {
  @IsEmail({}, { message: 'e-mail inválido' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'senha deve ter no mínimo 8 caracteres' })
  @Matches(PASSWORD_REGEX, {
    message: 'senha precisa ter maiúscula, minúscula, número e caractere especial'
  })
  password: string
}