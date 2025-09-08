import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PayrollEntryEntity } from './payroll-entry.entity';
import { PayrollEntryGenerateDto } from './dto/payroll-entry.dto';
import { PayrollSendDto } from './dto/payroll-send.dto';
import { NotificationService } from '@/notification/notification.service';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';
import { CompanyEntity } from '@/company/company.entity';

@Injectable()
export class PayrollEntryService {
    constructor(
      @InjectEntityManager() private readonly manager: EntityManager,
      private readonly notificationService: NotificationService
    ){}

    async createForCurrentMonth(body: PayrollEntryGenerateDto) {
      try {
        const result = await this.manager
          .createQueryBuilder()
          .insert()
          .into(PayrollEntryEntity)
          .values({
            employee_id: body.employee_id,
            discount_amount: body.discount,
            commission_amount: body.commission,
            gross_amount: body.salary.toString(),
            notes: body.notes,
            period_month: () => `date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date`,
          })
          .orIgnore()
          .execute()
      
        if (result.identifiers.length === 0) {
          // Já existia um lançamento para este funcionário no mês
          throw new BadRequestException('Lançamento já existe para este funcionário no mês vigente')
        }
      
        return result.identifiers[0]
      } catch (error) {
        console.error(error);
        throw error;
      }
        // (opcional) Valide que o funcionário pertence à empresa do token antes
      
        
    }

    async sendPayroll(body: PayrollSendDto, user: ITokenPayload): Promise<boolean> {
      try {
          if(!process.env.EMAIL_TO_REPORT) {
            throw new BadRequestException('Email to report is not set on environment variables');
          }

          // Preparar dados para o template
          const company = await this.manager.findOne(CompanyEntity, { where: { id: user.company_id }, select: { name: true } });

          if(!company) {
            throw new BadRequestException('Empresa não encontrada');
          }

          const templateData = {
            month: body.month,
            year: body.year,
            entries: body.entries,
            summary: body.summary,
            currentDate: new Date().toLocaleDateString('pt-BR'),
            company_name: company.name
          };

          const html = await this.notificationService.renderTemplate('./src/emails/payroll-notification.html', templateData);
          
          const { data, error } = await this.notificationService.sendEmail({
              from: 'Sistema Folha de Pagamento <noreply@consultingcontabil.com.br>',
              to: [process.env.EMAIL_TO_REPORT],
              subject: `Folha de Pagamento ${body.month}/${body.year} - Processada`,
              html,
          });

          if (error) {
              console.error('Error sending email:', error);
              throw new Error(`Failed to send email: ${error.message}`);
          }

          return true
      } catch (error) {
          console.error('Error in sendNotification:', error);
          throw error;
      }
  }
      
}
