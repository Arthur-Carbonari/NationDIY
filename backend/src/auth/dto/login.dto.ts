import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    readonly emailOrUsername: string;
  
    @IsNotEmpty()
    @IsString()
    readonly password: string;
  }