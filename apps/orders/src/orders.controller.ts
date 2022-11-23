import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { RabbitMQService } from './orders.service';
import { AppService } from '../../coffee_queue/src/app.service';

@Controller('order')
export class OrdersController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
    private createOrderDB,
  ) {}
  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    const num_post = id;
    return 'Message sent to the queue!';
  }

  @Post()
  async createOrder(@Body() post: CreateOrderDto) {
    this.createOrderDB(post);
    await this.rabbitMQService.sendToQueue('coffee_order', {
      order: JSON.stringify(post),
    });
  }
}
