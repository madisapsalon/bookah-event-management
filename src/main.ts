import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = process.env.HOST;
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://${host}:${port}`);
}
bootstrap();
