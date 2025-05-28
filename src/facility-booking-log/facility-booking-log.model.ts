import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
} from 'sequelize-typescript';
import { FacilityBooking } from '../facility-booking/facility-booking.model';

@Table({ tableName: 'booking_logs', timestamps: false })
export class BookingLog extends Model<BookingLog> {
  @ForeignKey(() => FacilityBooking)
  @Column({ field: 'booking_id', allowNull: false })
  bookingId!: number;

  @Column({ allowNull: false })
  status!: string;

  @Column({ field:'changed_by_user_id', allowNull: false })
  changedByUserId!: number;

  @CreatedAt
  @Column({ field: 'changed_at' })
  changedAt!: Date;
}
