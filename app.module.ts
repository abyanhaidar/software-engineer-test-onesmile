import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './src/config/database.config';
import { UserModule } from './src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './src/auth/auth.module';
import { ComplaintModule } from './src/complaint/complaint.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    UserModule,
    AuthModule,
    ComplaintModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
