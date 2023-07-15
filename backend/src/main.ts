import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketGateway } from './socket/socket.gateway';
import { subscribeMqtt } from './mqtt/subscribe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);

  const socketGateway = app.get(SocketGateway);

  await subscribeMqtt(socketGateway);
}
bootstrap();
