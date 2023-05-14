import { IsNotEmpty, IsString } from "class-validator";

//This class represents the data transfer object (DTO) for creating a new answer to a question. 
export class PostAnswerDto {
    // body of the question
    @IsNotEmpty()
    @IsString()
    readonly body: string;

}