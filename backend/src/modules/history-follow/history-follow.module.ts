import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../repositories/repository.module';
import { DaoModule } from '../../infrastructures/dao/dao.module';
import { PublicMqttService } from '../../mqtt/publish';
import { HistoryService } from './history-follow.service';
import { HistoryController } from './history-follow.controller';

@Module({
  imports: [RepositoryModule, DaoModule],
  providers: [HistoryService, PublicMqttService],
  controllers: [HistoryController],
})
export class HistoryModule {}
