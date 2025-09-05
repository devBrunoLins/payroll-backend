import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { SigninDto } from './dto/sign-in.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';
import { SignInService } from './sign-in.service';

@ApiTags('Autenticação')	
@Controller('auth')
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @Post('sign-in')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Login do usuário',
    description: 'Realiza o login do usuário no sistema' 
  })
  @ApiBody({ 
    type: SigninDto,
    description: 'Dados do usuário a serem utilizados para login'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login do usuário realizado com sucesso',
    example: { access_token: 'token' }
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor',
  })
  async signIn(@Body() body: SigninDto): Promise<{ access_token: string }> {
    return await this.signInService.signIn(body);
  }

  @Post('recovery-password')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Recuperação de senha',
    description: 'Recupera a senha do usuário' 
  })
  @ApiBody({ 
    type: RecoveryPasswordDto,
    description: 'Dados do usuário a serem utilizados para recuperação de senha'
  })
  async recoveryPassword(@Body() body: RecoveryPasswordDto): Promise<{ recovery_password_token: string }> {
    return await this.signInService.recoveryPassword(body);
  }
}
