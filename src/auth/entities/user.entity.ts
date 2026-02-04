import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Nombre de la tabla en Postgres
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true, // No puede haber dos correos iguales
    })
    email: string;

    @Column('text', {
        select: false, // ¡Seguridad! Al pedir un usuario, NO me traigas la contraseña por defecto
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true, // Por defecto, el usuario está activo
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user'] // Roles: 'admin', 'user', 'super-user'
    })
    roles: string[];
}