import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class CreateQuestionDto{

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly body: string;

    @IsOptional()
    @IsArray()
    readonly tags: string[]

}