import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter(),
  );

  dotenv.config();  

  if (process.env.NODE_ENV === 'development') {
    //swagger
    const options = new DocumentBuilder()
      .setTitle('Programs')
      .setDescription('Cadastro de Programas e Lojas')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  //pipelines de req
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(PORT);
}
bootstrap();
