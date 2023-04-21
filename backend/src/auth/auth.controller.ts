import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
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
    async login(@Body() { emailOrUsername, password }: LoginDto): Promise<{token: string}> {
      return this.authService.login(emailOrUsername, password);
    }

}
