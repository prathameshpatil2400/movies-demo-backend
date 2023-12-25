import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movies Crud Demo')
    .setDescription('Movies Crud Api Description')
    .setVersion('1.0')
    .setContact(
      'Prathamesh Patil',
      'https://bigscal.com',
      'prathameshpatil2400@gmail.com',
    )
    .addTag('Auth', "Authentication API's")
    .addTag('Movie', "Movie API's")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  await app.listen(3000);
}
bootstrap();
