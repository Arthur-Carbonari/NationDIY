import { IsNotEmpty, IsString } from "class-validator";

export class AcceptAnswerDto {

    @IsNotEmpty()
    @IsString()
    readonly answerId: string;
}
