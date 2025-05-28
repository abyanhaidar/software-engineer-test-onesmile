import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import sequelizeConfig from './src/config/database.config'; // adjust path

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Force sync only if you're okay wiping tables (for dev only)
  // await new Sequelize(sequelizeConfig).sync({ force: true });

  // Or use safe version: will create tables if they don't exist
  await new Sequelize(sequelizeConfig).authenticate();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('OneSmile-Abyan')
    .setDescription('Software Engineer Test Abyan Haidar Z')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-list', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
