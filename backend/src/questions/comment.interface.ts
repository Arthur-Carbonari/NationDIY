import MongooseSchema, { ObjectId } from 'mongoose'

// Interface defines the strucuture of comment object in the application

export interface Comment {
    body: string;
    author: { _id: ObjectId | string, username: string};
    createdAt: Date;
}