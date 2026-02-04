import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity'; // <--- CORREGIDO: Apunta directo al archivo

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]) // <--- Solo Product por ahora
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule { }