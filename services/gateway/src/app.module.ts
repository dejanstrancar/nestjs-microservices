import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathService } from './math/math.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'math_queue',
          queueOptions: {
            durable: false,
          },
          noAck: false,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule {}
