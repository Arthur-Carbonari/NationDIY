import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data transfer object for checking the availability of an email or username.
 */
export class CheckAvailabilityDto {

    /**
     * The email or username to check for availability.
     */
    @IsNotEmpty()
    @IsString()
    readonly emailOrUsername: string;
}
