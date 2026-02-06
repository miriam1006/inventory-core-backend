import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if (!user)
            throw new InternalServerErrorException('User not found in request (AuthGuard called?)');

        // Si piden un campo específico (ej: @GetUser('email'))
        if (data) {
            return user[data];
        }

        // Si no piden nada, devolvemos todo el usuario
        return user;
    }
);