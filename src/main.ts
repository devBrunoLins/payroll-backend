import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: false,
  });

  app.setGlobalPrefix('/v1/payroll');

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Payroll API')
  .setDescription('Documentação da API de payeollr')
  .setVersion('1.0')
  // .addBearerAuth(
  //   {
  //     description: `Insira apenas o token, sem aspas.`,
  //     name: 'Authorization',
  //     bearerFormat: 'Bearer',
  //     scheme: 'Bearer',
  //     type: 'http',
  //     in: 'Header',
  //   },
  //   'access-token',
  // )
  .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('v1/payroll/doc', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
