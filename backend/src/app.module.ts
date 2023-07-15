import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { RepositoryModule } from './repositories/repository.module';
import { CoordinateModule } from './modules/coordinate/coordinate.module';
import { HistoryModule } from './modules/history-follow/history-follow.module';

@Module({
  imports: [SocketModule, RepositoryModule, CoordinateModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
