// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EsignController } from './infrastructure/controllers/esign.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
