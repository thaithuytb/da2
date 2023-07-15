import { Module } from '@nestjs/common';
import { DaoModule } from '../infrastructures/dao/dao.module';
import { CoordinateRepository } from './coordinate.repository';
import { HistoryRepository } from './history.repository';
import { DeviceRepository } from './device.repository';

@Module({
  imports: [DaoModule],
  providers: [CoordinateRepository, HistoryRepository, DeviceRepository],
  exports: [CoordinateRepository, HistoryRepository, DeviceRepository],
})
export class RepositoryModule {}
