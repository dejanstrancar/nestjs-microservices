import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MathService {
  constructor(@Inject('MATH_SERVICE') private clientMathService: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.clientMathService.connect();
  }

  /**
   * accumulate
   */
  public accumulate(data: number[]) {
    return this.clientMathService.send<number, number[]>('mathAdd', data);
  }
}
