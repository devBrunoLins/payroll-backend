import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollEntity } from './payroll.entity';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayrollEntity])
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
