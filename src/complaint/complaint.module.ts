import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Complaint } from './complaint.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Complaint]),
    UserModule,
  ],
  providers: [ComplaintService],
  controllers: [ComplaintController],
})
export class ComplaintModule {}
