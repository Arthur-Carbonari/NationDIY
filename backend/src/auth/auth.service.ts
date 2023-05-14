import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from "./dto/signup.dto";
import { CheckAvailabilityDto } from './dto/check-availability.dto';

//Service responsible for managing user authentication and authorization using JWT tokens
@Injectable()
export class AuthService {

  /**
  Constructor for the AuthService class
  @param usersService An instance of the UsersService class, which provides user management functionality
  @param jwtService An instance of the JwtService class, which provides JWT token management functionality
  */

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  /**
 Creates a new user account and returns a JWT token for the newly created user
 @param signupDto An object containing the email, username and password of the new user
 @returns An object containing a JWT token for the newly created user
 */

  async signUp(signupDto: SignupDto): Promise<{ token: string; }> {

    const { email, username, password } = signupDto

    const user = await this.usersService.createUser(email, username, password)

    const token = this.jwtService.sign({ userId: user._id })

    return { token }
  }

  /**
  Authenticates a user and returns a JWT token for the authenticated user
  @param emailOrUsername The email or username of the user to be authenticated
  @param password The password of the user to be authenticated
  @returns An object containing a JWT token for the authenticated user
  @throws UnauthorizedException if the provided email/username and password combination is incorrect
  */

  async login(emailOrUsername: string, password: string): Promise<{ token: string }> {

    const user = await this.usersService.findByEmailOrUsername(emailOrUsername)

    if (!user || !(await user.matchPassword(password))) {
      throw new UnauthorizedException("Email or Password incorrect.");
    }

    const token = this.jwtService.sign({ userId: user._id });

    return { token };
  }
/**
  Checks whether a given email or username is available for registration
  @param checkAvailabilityDto An object containing the email or username to check for availability
  @returns true if the given email or username is available, false otherwise
*/

  async checkAvailability(checkAvailabilityDto: CheckAvailabilityDto) {

    const { emailOrUsername } = checkAvailabilityDto

    return !!(await this.usersService.findByEmailOrUsername(emailOrUsername))
  }

}

