
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ForbiddenException,
	Req, 
  ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { FacilityService } from './facility.service';
import { CreateFacilityDto, UpdateFacilityDto } from './dto/facility.dto';
import { CreateFacilityBookingDto, } from '../facility-booking/dto/facility-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FacilityBookingService } from '../facility-booking/facility-booking.service';

@ApiBearerAuth('access-token')
@Controller('facilities')
export class FacilityController {
  constructor(
    private readonly facilityService: FacilityService,
    private readonly bookingService: FacilityBookingService
) {}

  @Get()
  findAll() {
    return this.facilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateFacilityDto) {
    return this.facilityService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFacilityDto) {
    return this.facilityService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(+id);
  }

  
  @Get(':id/bookings')
  async getBookings(@Param('id') facilityId: string) {
    return this.bookingService.findAllByFacility(+facilityId);
  }

  @Post(':id/bookings')
  @ApiParam({
    name: 'id',
  })
  @UseGuards(JwtAuthGuard)
  async createBooking(
    @Param('id', ParseIntPipe) facilityId: number,
    @Body() dto: CreateFacilityBookingDto,
    @Req() req: any,
  ) {
    console.log(facilityId);
    const userId = req.user.id;
    return this.bookingService.create(dto, userId, facilityId);
  }

	@Put('bookings/:id/approve')
	@UseGuards(JwtAuthGuard)
	async approveBooking(
		@Param('id') bookingId: string,
		@Req() req: any
) {
		if (req.user.role !== 'admin') {
			throw new ForbiddenException('Only admins can approve bookings');
		}
		return this.bookingService.approve(+bookingId, req.user.id);
	}
}
