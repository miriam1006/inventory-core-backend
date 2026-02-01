import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- Importar esto
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity'; // <--- Importar la entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]) // <--- ¡Registrar aquí!
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
