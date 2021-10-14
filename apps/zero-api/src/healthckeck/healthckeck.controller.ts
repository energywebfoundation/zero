import { Controller, Get } from '@nestjs/common';
import { HealthckeckService } from './healthckeck.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { HealthcheckDto } from './dto/healthcheck.dto';

@Controller('healthcheck')
@ApiTags('healthcheck')
export class HealthckeckController {
  constructor(private readonly healthckeckService: HealthckeckService) {}

  @Get()
  @Public()
  @ApiOkResponse({ type: HealthcheckDto })
  getHealth() {
    return this.healthckeckService.getHealth();
  }
}
