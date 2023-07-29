import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RepositoryModule } from '../../repositories/repository.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { verifyTokenMiddleware } from '../../middlewares/decode-token';

@Module({
  imports: [RepositoryModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyTokenMiddleware)
      .forRoutes('api/v1/user/update-information');
  }
}
