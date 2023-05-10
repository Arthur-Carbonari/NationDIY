
export interface Question {
    _id: string;
    title: string;
    tags: string;
    body: string;
    author: string;
    votes: {value: number, user: string}[];  // check if this one must be Vote [] 
    comments: Comment[];
    answers: string[];
    createdAt: string;

}