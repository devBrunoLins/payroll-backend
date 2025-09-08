import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { PayrollSendDto } from '@/payroll-entry/dto/payroll-send.dto';

@ApiTags('Notificação')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

    // @Post('send-email')
    // @ApiOperation({ 
    //     summary: 'Enviar notificação de folha de pagamento',
    //     description: 'Envia email com os dados completos da folha de pagamento processada'
    // })
    // @ApiResponse({ 
    //     status: 201, 
    //     description: 'Email enviado com sucesso' 
    // })
    // @ApiResponse({ 
    //     status: 400, 
    //     description: 'Dados inválidos' 
    // })
    // @ApiResponse({ 
    //     status: 401, 
    //     description: 'Token de acesso inválido ou expirado' 
    // })
    // async sendEmail(@Body() body: PayrollSendDto) {
    //     return await this.notificationService.sendNotification(body);
    // }

    // @Post('test-email')
    // @ApiOperation({ 
    //     summary: 'Testar envio de email (dados fictícios)',
    //     description: 'Envia um email de teste com dados fictícios para verificar se o sistema está funcionando'
    // })
    // @ApiResponse({ 
    //     status: 201, 
    //     description: 'Email de teste enviado com sucesso' 
    // })
    // @ApiResponse({ 
    //     status: 401, 
    //     description: 'Token de acesso inválido ou expirado' 
    // })
    // async testEmail() {
    //     // Dados fictícios para teste com múltiplos funcionários
    //     const testData: PayrollSendDto = {
    //         month: '2024-01',
    //         year: 2024,
    //         entries: [
    //             {
    //                 employee_id: '550e8400-e29b-41d4-a716-446655440000',
    //                 employee_name: 'João Silva Santos',
    //                 salary: 5000.00,
    //                 discount: 250.00,
    //                 commission: 300.00,
    //                 netSalary: 5050.00,
    //                 observations: 'Comissão por vendas do mês'
    //             },
    //             {
    //                 employee_id: '550e8400-e29b-41d4-a716-446655440001',
    //                 employee_name: 'Maria Oliveira Costa',
    //                 salary: 3500.00,
    //                 discount: 175.00,
    //                 commission: 0,
    //                 netSalary: 3325.00,
    //                 observations: ''
    //             },
    //             {
    //                 employee_id: '550e8400-e29b-41d4-a716-446655440002',
    //                 employee_name: 'Carlos Eduardo Souza',
    //                 salary: 7200.00,
    //                 discount: 720.00,
    //                 commission: 500.00,
    //                 netSalary: 6980.00,
    //                 observations: 'Desconto por atraso aplicado'
    //             },
    //             {
    //                 employee_id: '550e8400-e29b-41d4-a716-446655440003',
    //                 employee_name: 'Ana Paula Ferreira',
    //                 salary: 4200.00,
    //                 discount: 0,
    //                 commission: 150.00,
    //                 netSalary: 4350.00,
    //                 observations: 'Bônus por produtividade'
    //             },
    //             {
    //                 employee_id: '550e8400-e29b-41d4-a716-446655440004',
    //                 employee_name: 'Pedro Henrique Lima',
    //                 salary: 2800.00,
    //                 discount: 140.00,
    //                 commission: 80.00,
    //                 netSalary: 2740.00,
    //                 observations: ''
    //             }
    //         ],
    //         summary: {
    //             totalEmployees: 5,
    //             totalSalaries: 22700.00,
    //             totalDiscounts: 1285.00,
    //             totalCommissions: 1030.00,
    //             totalNet: 22445.00
    //         }
    //     };

    //     return await this.notificationService.sendNotification(testData);
    // }
}
