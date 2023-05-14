import MongooseSchema, { ObjectId } from 'mongoose'

export interface Comment {
    body: string;
    author: { _id: ObjectId | string, username: string};
    createdAt: Date;
}