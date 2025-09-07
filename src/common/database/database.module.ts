import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from '../database/database.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT as unknown as number,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      schema: process.env.DATABASE_SCHEMA,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: true,
      //logging: true, // Habilita o log de todas as queries
      ssl: process.env.SSL_MODE,
      extra: {
        ssl: false,
      },
      timezone: process.env.TZ || 'America/Sao_Paulo',
    })
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders, TypeOrmModule],
})
export class DatabaseModule { }
