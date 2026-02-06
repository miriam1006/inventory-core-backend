import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@ApiBearerAuth() 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('private')
  @UseGuards(AuthGuard()) // 1. El guardia valida el token y mete al usuario en la request
  testingPrivateRoute(
    @GetUser() user: User, // 2. Nuestro decorador extrae el usuario limpio
    @GetUser('email') userEmail: string, // 3. También puede extraer solo un campo
  ) {

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail
    }
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login') // <--- Nuevo Endpoint
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  
}