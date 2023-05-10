
export interface Question {
    _id: string;
    title: string;
    tags: string;
    body: string;
    author: string;
    votes: {value: number, user: string}[]; 
    comments: Comment[];
    answers: string[];
    createdAt: string;

}