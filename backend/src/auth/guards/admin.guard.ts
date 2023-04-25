import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user && user.adminRights === true) {
            return true;
        }
        return false;
    }
}