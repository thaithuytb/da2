import { Module } from '@nestjs/common';
import { DaoModule } from '../infrastructures/dao/dao.module';
import { CoordinateRepository } from './coordinate.repository';

@Module({
  imports: [DaoModule],
  providers: [CoordinateRepository],
  exports: [CoordinateRepository],
})
export class RepositoryModule {}
