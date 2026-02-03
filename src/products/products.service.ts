import { Injectable, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
@Injectable()
export class ProductsService {

  // Usamos el Logger para ver errores bonitos en la terminal
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      // 1. Crear la instancia del producto (todavía no se guarda)
      const product = this.productRepository.create(createProductDto);

      // 2. Guardar en DB (ahora sí viaja a Postgres)
      await this.productRepository.save(product);

      return product;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // 1. Obtener todos los productos
  async findAll(paginationDto: PaginationDto) {

    // Desestructuramos y ponemos valores por defecto
    // Si no envían nada, limit es 10 y offset es 0
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.productRepository.find({
      take: limit,
      skip: offset,
      // Opcional: ordenar para que siempre salgan en el mismo orden
      // order: {
      //   title: 'ASC' 
      // }
    });
  }
  // 2. Obtener un producto por su ID (UUID)
  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id }
    });

    // Si no existe, lanzamos error 404 (Not Found)
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  // 3. Actualizar un producto por UUID
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id); // Reutiliza findOne (valida que exista)
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  // 4. Eliminar un producto por UUID
  async remove(id: string) {
    const product = await this.findOne(id); // Reutiliza findOne (valida que exista)
    await this.productRepository.remove(product);
    return product;
  }

  // Manejo de errores centralizado
  private handleDBExceptions(error: any) {
    if (error.code === '23505') // Código de Postgres para "Duplicate Key"
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Check server logs');
  }
}