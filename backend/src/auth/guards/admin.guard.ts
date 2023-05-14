import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

    /**
     * Determines whether the request is authorized to access the protected route based on user's admin rights.
     * @param context The execution context.
     * @returns A boolean indicating whether the request is authorized to access the protected route.
     */

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user && user.adminRights === true) {
            return true;
        }
        return false;
    }
}