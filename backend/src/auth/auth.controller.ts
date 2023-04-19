import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Get()
    getAuth(): string {
        return 'this is the get page for the auth route'
    }

    @Post('login')
    login(): string{
        return this.authService.login()
    }

    @Post('signup')
    signup(): string{
        return this.authService.signin()
    }
}
