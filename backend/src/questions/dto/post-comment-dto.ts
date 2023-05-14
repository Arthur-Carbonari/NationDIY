import { IsNotEmpty, IsString } from "class-validator";
// data transfer to post comment
export class PostCommentDto {
    // body of post 
    @IsNotEmpty()
    @IsString()
    readonly body: string;

}