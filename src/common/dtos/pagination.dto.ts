import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min, IsString } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {

    @ApiPropertyOptional({ default: 10, description: 'Límite de resultados' })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiPropertyOptional({ default: 0, description: 'Resultados a saltar' })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @ApiPropertyOptional({ description: 'Término de búsqueda (título o slug)' })
    @IsOptional()
    @IsString()
    term?: string;
}