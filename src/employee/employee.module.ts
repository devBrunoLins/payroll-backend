import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guards/jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, CompanyEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtStrategy],
})
export class EmployeeModule {}
