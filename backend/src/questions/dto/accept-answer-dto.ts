import { IsNotEmpty, IsString } from "class-validator";
//Data transfer object for accepting an answer to a question.
export class AcceptAnswerDto {
//The ID of the answer to accept.
    @IsNotEmpty()
    @IsString()
    readonly answerId: string;
}
