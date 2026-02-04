import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module'; // <--- Importar

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule // <--- ¡AGREGA ESTO!
  ]
})
export class SeedModule { }