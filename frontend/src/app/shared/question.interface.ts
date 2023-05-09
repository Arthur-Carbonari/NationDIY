
export interface Question {
    id: string;
    title: string;
    tags: string;
    body: string;
    author: string;
    votes: string[];  // check if this one must be Vote [] 
    comments: Comment[];
    answer: string[];
    createAt: Date;

}