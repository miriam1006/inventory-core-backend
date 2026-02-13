import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected(...roles), // 1. Pone la etiqueta de roles
        UseGuards(AuthGuard(), UserRoleGuard), // 2. Pone a los guardias
    );
}