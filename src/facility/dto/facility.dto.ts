import { ApiProperty } from '@nestjs/swagger';

export class CreateFacilityDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  description?: string;
}

export class UpdateFacilityDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  description?: string;
}


