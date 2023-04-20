import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    readonly emailOrUsername: string;
  
    @IsNotEmpty()
    readonly password: string;
  }