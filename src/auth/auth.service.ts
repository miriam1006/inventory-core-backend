import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'; 
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService, // <--- Inyectamos el servicio de JWT
  ) { }

  // REGISTRO
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete (user as any).password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }) // <--- ¡Ahora devolvemos token!
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // LOGIN (NUEVO)
  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    // 1. Buscar usuario por email (y pedir explícitamente el password)
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, fullName: true, roles: true, isActive: true } // Seleccionamos password que estaba oculto
    });

    // 2. Verificaciones de seguridad
    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    // 3. Comparar contraseñas (La que viene vs la encriptada en BD)
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    // 4. Retornar usuario y token
    delete (user as any).password; // Nunca devolver el hash

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  // MÉTODO PRIVADO PARA GENERAR TOKENS
  private getJwtToken(payload: { id: string }) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}