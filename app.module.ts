import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './src/config/database.config';
import { UserModule } from './src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './src/auth/auth.module';
import { ComplaintModule } from './src/complaint/complaint.module';
import { FacilityModule } from './src/facility/facility.module';
import { FacilityBookingModule } from './src/facility-booking/facility-booking.module';
import { BookingLog } from './src/facility-booking-log/facility-booking-log.model';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    AuthModule,
    UserModule,
    ComplaintModule,
    FacilityModule,
    FacilityBookingModule,
    BookingLog
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
