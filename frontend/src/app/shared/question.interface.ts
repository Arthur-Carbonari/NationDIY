import { Comment } from "./comment.interface";

export interface Question {
    _id: string;
    title: string;
    tags: string[];
    body: string;
    author: {_id: string, username: string};
    upvotes: { [key: string]: boolean };
    downvotes: { [key: string]: boolean };
    comments: Comment[];
    answers: string[];
    createdAt: string;
    acceptedAnswer: string;
    
}