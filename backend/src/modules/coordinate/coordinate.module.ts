import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../repositories/repository.module';
import { DaoModule } from '../../infrastructures/dao/dao.module';
import { PublicMqttService } from '../../mqtt/publish';
import { CoordinateService } from './coordinate.service';
import { CoordinateController } from './coordinate.controller';

@Module({
  imports: [RepositoryModule, DaoModule],
  providers: [CoordinateService, PublicMqttService],
  controllers: [CoordinateController],
})
export class CoordinateModule {}
