import { IsNotEmpty } from "class-validator";

export class VoteDto{

    @IsNotEmpty()
    readonly value: number;
}