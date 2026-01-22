import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { PayrollEntryModule } from './payroll-entry/payroll-entry.module';
import { NotificationModule } from './notification/notification.module';
import { DependentsModule } from './dependents/dependents.module';

@Module({
  imports: [
    EmployeeModule,
    DatabaseModule,
    UserModule,
    CompanyModule,
    PayrollEntryModule,
    NotificationModule,
    DependentsModule
  ]
})
export class AppModule {}
