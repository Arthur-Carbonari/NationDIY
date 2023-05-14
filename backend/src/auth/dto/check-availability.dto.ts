import { IsNotEmpty, IsString } from "class-validator";

export class CheckAvailabilityDto {

    @IsNotEmpty()
    @IsString()
    readonly emailOrUsername: string;
}
