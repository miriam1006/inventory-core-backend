import { IsString, IsNumber, IsPositive, IsOptional, IsInt, IsArray, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({ each: true }) // Revisa que CADA elemento del arreglo sea string
    @IsArray()
    sizes: string[];

    @IsString() // Ejemplo: 'men', 'women', 'unisex'
    gender: string;
}