import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Math_Main');

console.log(process.env.REDIS_HOST);
const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    host: 'redis',
    port: 6379,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  await app.listen();
  logger.log(`Microservice is running...`);
}

bootstrap();
