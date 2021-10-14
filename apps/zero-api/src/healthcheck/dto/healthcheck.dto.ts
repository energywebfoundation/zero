import { ApiProperty } from '@nestjs/swagger';

enum applicationStatus {
  OK = 'OK'
}

export class HealthcheckDto {
  constructor(partial: Partial<HealthcheckDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ enum: applicationStatus, enumName: 'applicationStatus' })
  status: string;
}
