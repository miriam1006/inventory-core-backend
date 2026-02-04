import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    // Inyectamos el servicio de Productos
    private readonly productsService: ProductsService
  ) { }

  async runSeed() {
    await this.insertNewProducts();
    return 'SEED EXECUTED';
  }

  private async insertNewProducts() {
    // 1. Borrar todo lo anterior
    await this.productsService.deleteAllProducts();

    // 2. Insertar los nuevos productos del archivo seed-data.ts
    const seedProducts = initialData.products;

    const insertPromises: Promise<any>[] = [];

    seedProducts.forEach(product => {
      // Usamos el método create de ProductsService que ya tienes hecho
      insertPromises.push(this.productsService.create(product));
    });

    // Esperar a que todas las promesas se resuelvan (Parallel execution)
    await Promise.all(insertPromises);

    return true;
  }
}