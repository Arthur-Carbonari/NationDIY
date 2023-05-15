import { Comment } from "./comment.interface";
// question interface, import comment, as it stors the comment in an internal array to cretrieve faster 
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