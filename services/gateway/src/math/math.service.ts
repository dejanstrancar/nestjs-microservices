import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MathService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'redis',
        port: 6379,
      },
    });
  }
  /**
   * accumulate
   */
  public accumulate(data: number[]) {
    return this.client.send<number, number[]>('Math_add', data);
  }

  public accumulate2(data: number[]) {
    // return this.client.send<number, number[]>('Math_add', data);
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }
}
