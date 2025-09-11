import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseProviders } from '../database/database.provider';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: process.env.DATABASE_TYPE as any,
//       host: process.env.DATABASE_HOST,
//       port: process.env.DATABASE_PORT as unknown as number,
//       username: process.env.DATABASE_USER,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE_DB,
//       schema: process.env.DATABASE_SCHEMA,
//       entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
//       synchronize: true,
//       //logging: true, // Habilita o log de todas as queries
//       timezone: process.env.TZ || 'America/Sao_Paulo',
//     })
//   ],
//   providers: [...databaseProviders],
//   exports: [...databaseProviders, TypeOrmModule],
// })
// export class DatabaseModule { }


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        const usingUrl = !!process.env.DATABASE_URL
        const isNeon =
          /neon\.tech/i.test(process.env.DATABASE_HOST ?? '') ||
          (process.env.DATABASE_URL ?? '').includes('neon.tech')

        const ssl =
          isNeon || process.env.IS_SSL_REQUIRED === 'true'
            ? { rejectUnauthorized: true }
            : undefined

        if (usingUrl) {
          // Modo URL (recomendado para Neon)
          return {
            type: process.env.DATABASE_TYPE as any,
            url: process.env.DATABASE_URL, // ex.: ...neon.tech/... ?sslmode=require
            ssl,
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            synchronize: true,
            // logging: true,
          }
        }

        // Modo host/port (seu formato atual)
        return {
          type: process.env.DATABASE_TYPE as any, // 'postgres'
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_DB,
          schema: process.env.DATABASE_SCHEMA,
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          synchronize: true,
          // logging: true,
          timezone: process.env.TZ || 'America/Sao_Paulo',
          ssl,
        }
      },
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders, TypeOrmModule],
})
export class DatabaseModule {}
