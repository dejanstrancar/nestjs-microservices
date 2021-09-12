import { Controller, Logger } from '@nestjs/common';
import {
  MessagePattern,
  ClientProxy,
  EventPattern,
  RmqContext,
  Payload,
  Ctx,
} from '@nestjs/microservices';
import { MathService } from './math/math.service';

@Controller()
export class AppController {
  constructor(private readonly mathService: MathService) {}
  private logger = new Logger('Math_AppController');

  @MessagePattern('mathAdd')
  async accumulate(@Payload() data: number[], @Ctx() context: RmqContext) {
    this.logger.log(`Adding ${data.toString()}`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    channel.ack(originalMessage);
    return this.mathService.accumualte(data);
  }

  @EventPattern('hello')
  async hello(data: any) {
    console.log(data);
  }
}
