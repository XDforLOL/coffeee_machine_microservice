import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import Order from '../../../libs/common/db_entites/order.entity';
import { Repository } from 'typeorm';
import OrderEntity from '../../../libs/common/db_entites/order.entity';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('rabbit-mq-module') private readonly client: ClientProxy,
    @InjectRepository(Order)
    private orderRepository: Repository<OrderEntity>,
  ) {}
  public sendToQueue(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }

  getAllOrders() {
    return this.orderRepository.find();
  }

  async getOrderById(id: number) {
    const post = await this.orderRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createOrderDB(post: CreateOrderDto) {
    const newOrder = await this.orderRepository.create(post);
    await this.orderRepository.save(newOrder);
    return newOrder;
  }
}
