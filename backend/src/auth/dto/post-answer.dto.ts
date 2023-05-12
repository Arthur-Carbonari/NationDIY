import { IsNotEmpty, IsString } from "class-validator";

export class PostAnswerDto {
    
    @IsNotEmpty()
    @IsString()
    readonly body: string;

}