import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FacilityBooking } from './facility-booking.model';
import { FacilityBookingService } from './facility-booking.service';
import { FacilityBookingController } from './facility-booking.controller';
import { Facility } from '../facility/facility.model';
import { BookingLog } from '../facility-booking-log/facility-booking-log.model';

@Module({
  imports: [SequelizeModule.forFeature([FacilityBooking, Facility, BookingLog])],
  providers: [FacilityBookingService],
  controllers: [FacilityBookingController],
  exports: [FacilityBookingService],
})
export class FacilityBookingModule {}
