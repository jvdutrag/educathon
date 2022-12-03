import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'

@Injectable()
export class RefreshJwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request

    if (!request.cookies['auth']) {
        throw new BadRequestException('Refresh Token Not Found')
    }

    return true
  }
}
