import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { FacilityBooking } from '../facility-booking/facility-booking.model';

@Table({ tableName: 'facilities' })
export class Facility extends Model<Facility> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column(DataType.STRING)
  address?: string;

  @Column(DataType.TEXT)
  description?: string;

  @HasMany(() => FacilityBooking)
  bookings?: FacilityBooking[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt?: Date;
}
