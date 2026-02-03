import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // <--- TRUCO: Esto convierte '10' a número automáticamente (ayuda a la paginación)
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  // --- CONFIGURACIÓN SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Inventory RESTFul API')
    .setDescription('Endpoints para la gestión de inventario de Teslo-Shop')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La docs estará en /api
  // -----------------------------

  await app.listen(3000);
}
bootstrap();