import { Controller, HttpCode, Get, ServiceUnavailableException } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health Check')	
@Controller('health-check')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(200)
  async health(): Promise<any> {
    const result = await this.healthService.check()

    if (result.status !== 'ok') {
      throw new ServiceUnavailableException(result)
    }

    return result
  }
}
