import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <--- Importar

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Opcional: Para que todas las rutas empiecen con /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina datos que no esperamos (seguridad)
      forbidNonWhitelisted: true, // Tira error si envían datos extra
    })
  );

  await app.listen(3000);
}
bootstrap();