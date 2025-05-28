import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { User } from '../user/user.model';
import { Complaint } from '../complaint/complaint.model';
import { Facility } from '../facility/facility.model';
import { FacilityBooking } from '../facility-booking/facility-booking.model';
import { BookingLog } from '../facility-booking-log/facility-booking-log.model';
dotenv.config();

export const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User, Complaint, Facility, FacilityBooking, BookingLog],
  logging: false,
};

