import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';
import ErrorMessage from 'src/common/constants/error-messages';
import validator from 'validator';

export class SignupDto {

    // @IsEmail()
    // @IsNotEmpty()
    readonly email: string;

    // @IsNotEmpty()
    // @Validate(validator.isStrongPassword, {message: ErrorMessage.WEAK_PASSWORD} )
    readonly password: string;

    // @IsNotEmpty()
    // @Length(3, 20)
    readonly username: string;
}
