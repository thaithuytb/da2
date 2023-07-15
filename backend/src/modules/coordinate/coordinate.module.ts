import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RepositoryModule } from '../../repositories/repository.module';
import { DaoModule } from '../../infrastructures/dao/dao.module';
import { PublicMqttService } from '../../mqtt/publish';
import { CoordinateService } from './coordinate.service';
import { CoordinateController } from './coordinate.controller';
import { SocketGateway } from '../../socket/socket.gateway';
import { verifyTokenMiddleware } from '../../middlewares/decode-token';
import { UserService } from '../user/user.service';

@Module({
  imports: [RepositoryModule, DaoModule],
  providers: [CoordinateService, PublicMqttService, SocketGateway, UserService],
  controllers: [CoordinateController],
})
export class CoordinateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenMiddleware).forRoutes('api/v1/coordinates');
  }
}
