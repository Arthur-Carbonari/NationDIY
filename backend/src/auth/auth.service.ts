import * as bcrypt from "bcrypt";
import { Injectable } from '@nestjs/common';
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

    async login() {
        this.usersService.findByEmail('lala@gmail.com')
        return 'you just logged in'
    }

}

