import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Esto le dice a TypeORM: "Crea una tabla llamada 'product'"
export class Product {

    @PrimaryGeneratedColumn('uuid') // ID único e irrepetible (ej: a1b2-c3d4...)
    id: string;

    @Column('text', { unique: true }) // El nombre debe ser texto y NO se puede repetir
    title: string;

    @Column('float', { default: 0 }) // Precio numérico, si no ponen nada es 0
    price: number;

    @Column('text', { nullable: true }) // Descripción opcional
    description: string;

    @Column('text', { unique: true }) // "slug" es para la URL (ej: camiseta-nike-negra)
    slug: string;

    @Column('int', { default: 0 }) // Stock disponible
    stock: number;

    @Column('text', { array: true }) // Un arreglo de tallas (['S', 'M', 'L'])
    sizes: string[];

    @Column('text') // Género (Hombres, Mujeres, Unisex)
    gender: string;
}