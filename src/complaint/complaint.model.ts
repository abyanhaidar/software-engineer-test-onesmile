import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

export enum ComplaintStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
}

@Table({ tableName: 'complaints' })
export class Complaint extends Model<Complaint> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column({
    type: DataType.ENUM(...Object.values(ComplaintStatus)),
    defaultValue: ComplaintStatus.OPEN,
  })
  status!: ComplaintStatus;

  @Column(DataType.STRING)
  category!: string;

  @Column({ field: 'image_url', type: DataType.STRING, allowNull: true })
	
  imageUrl?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date;
}
