import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,             // Puerto por defecto de Postgres
      username: 'admin',      // Lo definimos en docker-compose.yml
      password: 'root',       // Lo definimos en docker-compose.yml
      database: 'inventoryDB',// Lo definimos en docker-compose.yml
      autoLoadEntities: true, // Carga automática de tablas
      synchronize: true,      // ⚠️ Crea las tablas automáticamente (Solo para Dev)
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }