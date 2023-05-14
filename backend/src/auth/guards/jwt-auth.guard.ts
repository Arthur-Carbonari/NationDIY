import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

  /**
     * Activates the JSON Web Token (JWT) authentication guard.
     * @returns The result of the authentication guard.
     */
    
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
