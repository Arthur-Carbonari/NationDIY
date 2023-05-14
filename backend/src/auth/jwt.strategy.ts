import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt"
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    /**
     * 
     * @param usersService Constructs a new instance of the JwtStrategy class.
     * @param usersService - An instance of the UsersService class used to validate the user ID extracted from the JWT payload.
     */

    constructor(private usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
          });
    }

    /**
     *   Validates the JWT payload extracted from the Authorization header.
     *   @param payload - The decoded JWT payload object.
     *   @returns - A Promise that resolves to the user object associated with the user ID extracted from the payload.
     *   @throws - An UnauthorizedException if the user object cannot be found in the database.
     */
    async validate(payload: any){
        const {userId} = payload

        const user = await this.usersService.findById(userId)

        if(!user){
            throw new UnauthorizedException('Login is required to access this endpoint.');
            
        }

        return user
    }

}