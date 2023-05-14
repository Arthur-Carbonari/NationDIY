import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    /**
     * Returns a string representing the get page for the auth route.
     * @returns A string representing the get page for the auth route.
     */

    @Get()
    getAuth(): string {
        return 'this is the get page for the auth route'
    }

    /**
     * Registers a new user and returns a token for authentication.
     * @param signupDto A DTO object containing the email, password, and username of the new user.
     * @returns A Promise that resolves to an object containing a JWT token.
     */

    @Post('signup')
    signUp(@Body() signupDto: SignupDto): Promise<{ token: string }> {            
        return this.authService.signUp(signupDto)
    }

    /**
     * Authenticates a user and returns a token for authentication.
     * @param loginDto A DTO object containing the email or username and password of the user.
     * @returns A Promise that resolves to an object containing a JWT token.
     */

    @Post('login')
    async login(@Body() { emailOrUsername, password }: LoginDto): Promise<{token: string}> {
      return this.authService.login(emailOrUsername, password);
    }
    
    /**
     * Checks the availability of a given email or username.
     * @param checkAvailabilityDto A DTO object containing the email or username to check for availability.
     * @returns An object containing a boolean indicating whether the email or username is available.
     */

    @Post('check-availability')
    checkAvailability(@Body() checkAvailabilityDto: CheckAvailabilityDto){

        return {available: this.authService.checkAvailability(checkAvailabilityDto)}
    }

}
