import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Espera el token en los Headers
        });
    }

    // Esta función se ejecuta si el token tiene la firma correcta y no ha expirado
    async validate(payload: JwtPayload): Promise<User> {

        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new UnauthorizedException('Token not valid');

        if (!user.isActive)
            throw new UnauthorizedException('User is inactive, talk with an admin');

        // Lo que retornes aquí se añade a la Request como "req.user"
        return user;
    }
}