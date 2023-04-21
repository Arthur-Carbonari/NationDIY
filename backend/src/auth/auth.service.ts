import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signUp(signupDto: SignupDto): Promise<{ token: string; }> {

    const { email, username, password } = signupDto

    const user = await this.usersService.createUser(email, username, password)

    const token = this.jwtService.sign({ userId: user._id })

    return { token }
  }

  async login(emailOrUsername: string, password: string): Promise<{ token: string }> {

    const user = await this.usersService.findByEmailOrUsername(emailOrUsername)    

    if (!user || !(await user.matchPassword(password))) {
      throw new UnauthorizedException("Email or Password incorrect.");
    }

    const token = this.jwtService.sign({ userId: user._id });

    return { token };
  }

}

