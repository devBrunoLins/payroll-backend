import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollEntryEntity } from './payroll-entry.entity';
import { PayrollEntryController } from './payroll-entry.controller';
import { PayrollEntryService } from './payroll-entry.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayrollEntryEntity])
  ],
  controllers: [PayrollEntryController],
  providers: [PayrollEntryService],
})
export class PayrollEntryModule {}
