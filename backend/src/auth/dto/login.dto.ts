import { IsNotEmpty, IsString } from "class-validator";


//Data transfer object for user login.
 

export class LoginDto {
  //The email or username of the user.
    @IsNotEmpty()
    @IsString()
    readonly emailOrUsername: string;
  
    //The password of the user.
    @IsNotEmpty()
    @IsString()
    readonly password: string;
  }