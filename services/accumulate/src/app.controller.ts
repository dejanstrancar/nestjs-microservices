import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MathService } from './math/math.service';

@Controller()
export class AppController {
  constructor(private readonly mathService: MathService) {}
  private logger = new Logger('Math_AppController');

  @MessagePattern('Math_add')
  async accumulate(data: number[]) {
    this.logger.log(`Adding ${data.toString()}`);
    return this.mathService.accumualte(data);
  }
}
