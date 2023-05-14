import { IsNotEmpty, IsString } from "class-validator";

export class PostCommentDto {
    
    @IsNotEmpty()
    @IsString()
    readonly body: string;

}