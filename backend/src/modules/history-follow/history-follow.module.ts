import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RepositoryModule } from '../../repositories/repository.module';
import { DaoModule } from '../../infrastructures/dao/dao.module';
import { HistoryService } from './history-follow.service';
import { HistoryController } from './history-follow.controller';
import { verifyTokenMiddleware } from '../../middlewares/decode-token';
import { UserService } from '../user/user.service';

@Module({
  imports: [RepositoryModule, DaoModule],
  providers: [HistoryService, UserService],
  controllers: [HistoryController],
})
export class HistoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenMiddleware).forRoutes('api/v1/histories');
  }
}
