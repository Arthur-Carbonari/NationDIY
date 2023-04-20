import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Get()
    getAuth(): string {
        return 'this is the get page for the auth route'
    }

    @Post('signup')
    signUp(@Body() signupDto: SignupDto): Promise<{ token: string }> | Error {
        
        const { email, username, password } = signupDto;
            
        return this.authService.signUp(email, username, password)
    }

    @Post('login')
    login() {
        return this.authService.login()
    }

}
