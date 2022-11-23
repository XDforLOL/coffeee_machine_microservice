import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { RabbitMQModule } from './modules/rabbit-mq/rabbit-mq.module';
import { AppService } from '../../coffee_queue/src/app.service';
import Order from '../../../libs/common/db_entites/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQService } from './orders.service';

@Module({
  imports: [RabbitMQModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [AppService, RabbitMQService],
})
export class OrdersModule {}
