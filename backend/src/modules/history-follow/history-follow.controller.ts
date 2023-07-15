import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history-follow.service';

@Controller('api/v1/histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistoriesByDeviceId() {
    console.log('aaaaaaaaaaaa');
    return this.historyService.getHistoriesByDeviceId({ userId: 1 });
  }
}
