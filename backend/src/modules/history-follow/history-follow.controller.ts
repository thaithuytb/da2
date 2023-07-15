import { Controller, Get, Req } from '@nestjs/common';
import { HistoryService } from './history-follow.service';

@Controller('api/v1/histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistoriesByDeviceId(@Req() req: any) {
    return this.historyService.getHistoriesByDeviceId({ userId: req.user.id });
  }
}
