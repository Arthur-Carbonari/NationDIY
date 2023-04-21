import * as bcrypt from "bcrypt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(email: string, username: string, password: string): Promise<{ token: string; }> {

        const hashedPassword = await bcrypt.hash(password, 10)
                        
        const user = await this.usersService.createUser(email, username, hashedPassword)
        
        const token = this.jwtService.sign({ userId: user._id })
        
        return { token }
    }

    async login(emailOrUsername: string, password: string): Promise<{token: string}> {
        
        const user = await this.usersService.findByEmailOrUsername(emailOrUsername);

        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new UnauthorizedException("Email or Password incorrect.");
        }
    
        const token = this.jwtService.sign({ userId: user._id});
        return { token };
      }

}

