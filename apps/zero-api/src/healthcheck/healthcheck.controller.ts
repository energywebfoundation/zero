import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { HealthcheckDto } from './dto/healthcheck.dto';

@Controller('healthcheck')
@ApiTags('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get()
  @Public()
  @ApiOkResponse({ type: HealthcheckDto })
  getHealth() {
    return this.healthcheckService.getHealth();
  }
}
