import { IsString, IsNumber, IsPositive, IsOptional, IsInt, IsArray, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty({
        description: 'El nombre único del producto',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty()
    @IsString()
    gender: string;
}