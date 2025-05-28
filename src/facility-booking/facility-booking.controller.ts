
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FacilityBookingService } from './facility-booking.service';
import { CreateFacilityBookingDto } from './dto/facility-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('facility-bookings')
@Controller('api')
export class FacilityBookingController {
  constructor(private readonly bookingService: FacilityBookingService) {}

}