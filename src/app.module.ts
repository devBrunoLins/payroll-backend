import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './user/user.module';
import { PayrollModule } from './payroll/payroll.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    EmployeeModule,
    DatabaseModule,
    UserModule,
    PayrollModule,
    CompanyModule
  ]
})
export class AppModule {}
