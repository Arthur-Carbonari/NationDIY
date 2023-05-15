import { Comment } from "./comment.interface";

// interfave for answer component
export interface Answer {
    _id: string;

    title: string;
    author: {_id: string, username: string};
    body: string;
    tags: string;
    createdAt: string;
    comments: Comment[];
    
    question: string;
    upvotes: { [key: string]: boolean };
    downvotes: { [key: string]: boolean };
}