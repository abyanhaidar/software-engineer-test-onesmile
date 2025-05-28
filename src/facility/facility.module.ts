import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Facility } from './facility.model';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { FacilityBookingModule } from '../facility-booking/facility-booking.module';

@Module({
  imports: [SequelizeModule.forFeature([Facility]), FacilityBookingModule],
  providers: [FacilityService],
  controllers: [FacilityController],
  exports: [FacilityService],
})
export class FacilityModule {}
