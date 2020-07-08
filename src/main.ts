import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require('express');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('./asset'));
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
