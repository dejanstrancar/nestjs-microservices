import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ClientOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Math_Main');

const microserviceOptions: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'math_queue',
    queueOptions: {
      durable: false,
    },
    noAck: false,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions,
  );

  await app.listen();
  logger.log(`Microservice is running...`);
}

bootstrap();
