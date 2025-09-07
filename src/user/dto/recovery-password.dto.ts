import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RecoveryPasswordDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'usuario@exemplo.com.br',
        format: 'email'
      })
      @IsNotEmpty({ message: 'Email é obrigatório' })
      @IsEmail({}, { message: 'Email deve ter um formato válido' })
      email: string
}