import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../coffee_queue/src/app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost'],
      queue: 'hello',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
