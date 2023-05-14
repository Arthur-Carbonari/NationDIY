import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';
import ErrorMessage from 'src/common/constants/error-messages';
import validator from 'validator';

//Data transfer object for user signup.
export class SignupDto {

     /**
     * The email of the user.
     * @remarks This field is optional if the user chooses to sign up with a username instead.
     * @see https://github.com/typestack/class-validator#usage
     */

    // @IsEmail()
    // @IsNotEmpty()
    readonly email: string;

     /**
     * The password of the user.
     * @remarks The password must be a strong password.
     * @see https://github.com/typestack/class-validator#usage
     */

    // @IsNotEmpty()
    // @Validate(validator.isStrongPassword, {message: ErrorMessage.WEAK_PASSWORD} )
    readonly password: string;

     /**
     * The username of the user.
     * @remarks The username must be between 3 and 20 characters long.
     * @see https://github.com/typestack/class-validator#usage
     */
    
    // @IsNotEmpty()
    // @Length(3, 20)
    readonly username: string;
}
