import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    login(): string {
        return 'you just logged in'
    }

    signin(): string {
        return 'you just signed in'
    }
}
