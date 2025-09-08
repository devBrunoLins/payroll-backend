import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollEntryEntity } from './payroll-entry.entity';
import { PayrollEntryController } from './payroll-entry.controller';
import { PayrollEntryService } from './payroll-entry.service';
import { NotificationModule } from '@/notification/notification.module';
import { CompanyEntity } from '@/company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayrollEntryEntity, CompanyEntity]),
    NotificationModule  
  ],
  controllers: [PayrollEntryController],
  providers: [PayrollEntryService],
})
export class PayrollEntryModule {}
