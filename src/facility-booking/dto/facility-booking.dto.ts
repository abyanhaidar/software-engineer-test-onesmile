import { ApiProperty } from '@nestjs/swagger';

export class CreateFacilityBookingDto {

  @ApiProperty()
  scheduleStart?: Date;

  @ApiProperty()
  scheduleEnd?: Date;
}
