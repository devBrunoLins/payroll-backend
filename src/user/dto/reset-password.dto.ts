import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { PASSWORD_REGEX } from "../constants/password.regex";

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'usuario@exemplo.com.br',
        format: 'email'
    })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsEmail({}, { message: 'Email deve ter um formato válido' })
    email: string

    @ApiProperty({
        description: 'Nova senha do usuário',
        example: 'P@$$w0rd..',
        format: 'password'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'senha deve ter no mínimo 8 caracteres' })
    @Matches(PASSWORD_REGEX, {
    message: 'senha precisa ter maiúscula, minúscula, número e caractere especial'
    })
    new_password: string
}