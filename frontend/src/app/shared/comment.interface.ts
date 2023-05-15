// comment interface
export interface Comment {
    body: string;
    author: { _id: string, username: string};
    createdAt: string;
}