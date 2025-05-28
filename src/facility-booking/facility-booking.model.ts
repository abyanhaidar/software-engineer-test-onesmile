import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Facility } from '../facility/facility.model';
import { User } from '../user/user.model';

@Table({ tableName: 'facility_bookings' })
export class FacilityBooking extends Model<FacilityBooking> {
  @ForeignKey(() => Facility)
  @Column({ field: 'facility_id' })
  facilityId!: number;

  @BelongsTo(() => Facility)
  facility!: Facility;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({ field: 'schedule_start', type: DataType.DATE, allowNull: false })
  scheduleStart!: Date;

  @Column({ field: 'schedule_end', type: DataType.DATE, allowNull: false })
  scheduleEnd!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  approved!: boolean;

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
