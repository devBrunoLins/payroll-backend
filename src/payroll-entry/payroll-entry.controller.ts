import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PayrollEntryService } from './payroll-entry.service';
import { PayrollEntryGenerateDto } from './dto/payroll-entry.dto';
import { PayrollSendDto } from './dto/payroll-send.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt/jwt-auth.guard';
import { LoggedUser } from '@/common/decorators/logged-user.decorator';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';

@ApiTags('Geração de lançamentos de folha	')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('payroll-entry')
export class PayrollEntryController {
  constructor(private readonly payrollEntryService: PayrollEntryService) {}

  @Post('generate')
  @ApiOperation({ 
    summary: 'Gerar lançamentos da folha de pagamento',
    description: 'Gera os lançamentos da folha de pagamento para o mês atual com base nos dados dos funcionários'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Lançamentos gerados com sucesso' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou expirado' 
  })
  async createForCurrentMonth(@Body() body: PayrollEntryGenerateDto) {
    return this.payrollEntryService.createForCurrentMonth(body);
  }

  @Post('send')
  @ApiOperation({ 
    summary: 'Enviar folha de pagamento processada',
    description: 'Envia os dados completos da folha de pagamento processada com todas as entradas e resumo consolidado'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Folha de pagamento enviada com sucesso',
    type: PayrollSendDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou expirado' 
  })
  async sendPayroll(@Body() body: PayrollSendDto, @LoggedUser() user: ITokenPayload): Promise<boolean> {
    return await this.payrollEntryService.sendPayroll(body, user);
  }
}
