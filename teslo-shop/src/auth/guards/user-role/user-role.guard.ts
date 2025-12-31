import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector

  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get('roles', context.getHandler());
    if (!validRoles) {
      return true;
    }
     const req = context.switchToHttp().getRequest();
        const user = req.user;

    if (!user) {
      throw new BadRequestException('User not found');
    }
    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }
   throw new BadRequestException(`User ${user.fullName} does not have valid roles: ${validRoles}`);
  }
}
