import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  category?: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

}

export class UpdateComplaintDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  category?: string;

  @ApiProperty()
  imageUrl?: string;
}