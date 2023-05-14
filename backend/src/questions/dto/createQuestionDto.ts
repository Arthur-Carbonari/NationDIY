import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

//DTO class for creating a new question
export class CreateQuestionDto{

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly body: string;
// only field optional
    @IsOptional()
    @IsArray()
    readonly tags: string[]

}