import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // 1. Obtener los roles permitidos (la etiqueta @RoleProtected)
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    // Si no hay roles definidos, cualquiera entra
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    // 2. Obtener el usuario (el AuthGuard ya lo puso aquí)
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user)
      throw new BadRequestException('User not found');

    // 3. Verificar si el usuario tiene algún rol permitido
    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    // 4. Si llegamos aquí, ¡FUERA!
    throw new ForbiddenException(
      `User ${user.fullName} need a valid role: [${validRoles}]`
    );
  }
}