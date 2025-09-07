import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PayrollEntryEntity } from './payroll-entry.entity';
import { PayrollEntryGenerateDto } from './dto/payroll-entry.dto';

@Injectable()
export class PayrollEntryService {
    constructor(@InjectEntityManager() private readonly manager: EntityManager){}

    async createForCurrentMonth(body: PayrollEntryGenerateDto) {
        // (opcional) Valide que o funcionário pertence à empresa do token antes
      
        const result = await this.manager
          .createQueryBuilder()
          .insert()
          .into(PayrollEntryEntity)
          .values({
            employee_id: body.employee_id,
            discount_amount: body.discount,
            commission_amount: body.comission,
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
      }
      
}
