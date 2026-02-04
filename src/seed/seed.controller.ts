import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SeedService } from './seed.service';
import { ApiBearerAuth } from '@nestjs/swagger'; // <--- 1. Importar esto

@ApiBearerAuth() // <--- 2. Agregar este decorador
@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) { }

  @Get()
  @UseGuards(AuthGuard())
  executeSeed() {
    return this.seedService.runSeed();
  }
}