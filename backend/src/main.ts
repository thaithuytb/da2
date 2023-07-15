import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketGateway } from './socket/socket.gateway';
import { subscribeMqtt } from './mqtt/subscribe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5005);
  app.enableCors();

  const socketGateway = app.get(SocketGateway);

  await subscribeMqtt(socketGateway);
}
bootstrap();
