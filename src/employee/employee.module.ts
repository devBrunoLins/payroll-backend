import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { CompanyEntity } from 'src/company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, CompanyEntity])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
