import { Module } from '@nestjs/common';
import { DaoModule } from '../infrastructures/dao/dao.module';
import { CoordinateRepository } from './coordinate.repository';
import { HistoryRepository } from './history.repository';
import { DeviceRepository } from './device.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [DaoModule],
  providers: [
    CoordinateRepository,
    HistoryRepository,
    DeviceRepository,
    UserRepository,
  ],
  exports: [
    CoordinateRepository,
    HistoryRepository,
    DeviceRepository,
    UserRepository,
  ],
})
export class RepositoryModule {}
