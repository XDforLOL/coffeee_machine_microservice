import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload, EventPattern,
} from '@nestjs/microservices';
import { AppService } from '../../coffee_queue/src/app.service';

@Controller()
export class DeliveryController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('rabbit-mq-producer')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    console.log(channel);
    console.log(originalMessage);
    console.log('data', JSON.stringify(data));
    channel.ack(originalMessage);
  }
}
