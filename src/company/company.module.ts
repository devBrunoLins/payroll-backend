import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyEntity } from './company.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guards/jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { EmployeeEntity } from '@/employee/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, EmployeeEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService, JwtStrategy],
})
export class CompanyModule {}
