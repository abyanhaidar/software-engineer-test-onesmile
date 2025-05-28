import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from './src/config/database.config';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Enable CORS
  await new Sequelize(sequelizeConfig).authenticate();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('OneSmile-Abyan')
    .setDescription('Software Engineer Test Abyan Haidar Z')
    .setVersion('1.0')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-list', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
