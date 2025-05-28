import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FacilityBooking } from './facility-booking.model';
import { CreateFacilityBookingDto } from './dto/facility-booking.dto';
import { Facility } from '../facility/facility.model';
import { BookingLog } from '../facility-booking-log/facility-booking-log.model';

@Injectable()
export class FacilityBookingService {
  constructor(
    @InjectModel(FacilityBooking)
    private readonly bookingModel: typeof FacilityBooking,
    @InjectModel(Facility)
    private readonly facilityModel: typeof Facility,
    @InjectModel(BookingLog)
    private readonly bookingLogModel: typeof BookingLog,
  ) {}

	async isAvailable(
    facilityId: number,
    scheduleStart: Date,
    scheduleEnd: Date,
  ): Promise<boolean> {
    const overlappingBooking = await this.bookingModel.findOne({
      where: {
        facilityId,
        approved: true,
        scheduleStart: { $lt: scheduleEnd },
        scheduleEnd: { $gt: scheduleStart },
      },
    });
    return !overlappingBooking;
  }

  async findAllByFacility(facilityId: number): Promise<FacilityBooking[]> {
    return this.bookingModel.findAll({
      where: { facilityId },
      include: [{ model: Facility }],
    });
  }

  async create(dto: CreateFacilityBookingDto, userId: number, facilityId:number): Promise<FacilityBooking> {
    if (facilityId === undefined) {
      throw new BadRequestException('Facility ID is required');
    }
    const facility = await this.facilityModel.findByPk(facilityId);
    if (!facility) throw new NotFoundException('Facility not found');

    if (!dto.scheduleStart || !dto.scheduleEnd) {
      throw new BadRequestException('Schedule start and end times are required');
    }

    const available = await this.isAvailable(facilityId, dto.scheduleStart, dto.scheduleEnd);
    if (!available) {
      throw new BadRequestException('Facility is already booked for the selected time range');
    }


    const create: any = {
      facilityId: facilityId,
      userId,
      scheduleStart: dto.scheduleStart,
      scheduleEnd: dto.scheduleEnd,
      approved: false,
    };

    const booking = await this.bookingModel.create(create);

    return booking;
  }

async approve(bookingId: number, changedByUserId: number): Promise<FacilityBooking> {
  const booking = await this.bookingModel.findByPk(bookingId);
  if (!booking) throw new BadRequestException('Booking not found');

  booking.approved = true;
  await booking.save();

	// Create a log entry for the booking approval
	const create: any = {
		bookingId: booking.id,
    status: 'approved',
    changedByUserId,
	}
  await this.bookingLogModel.create(create);

  return booking;
}


}
