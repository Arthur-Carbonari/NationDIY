
export interface Question {
    _id: string;
    title: string;
    tags: string;
    body: string;
    author: string;
    upvotes: { [key: string]: boolean };
    downvotes: { [key: string]: boolean };
    comments: Comment[];
    answers: string[];
    createdAt: string;

}