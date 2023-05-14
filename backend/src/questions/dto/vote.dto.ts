import { IsNotEmpty } from "class-validator";

export class VoteDto{
    // The value of the vote. Must be either 1 (upvote) or -1 (downvote).
    @IsNotEmpty()
    readonly value: number;
}