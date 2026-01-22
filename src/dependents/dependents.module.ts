import { Module } from '@nestjs/common';
import { DependentsController } from './dependents.controller';
import { DependentsService } from './dependents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependentsEntity } from './dependents.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guards/jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from '@/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DependentsEntity, CompanyEntity, UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [DependentsController],
  providers: [DependentsService, JwtStrategy],
})
export class DependentsModule {}
