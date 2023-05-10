import MongooseSchema from 'mongoose'

export interface Comment {
    content: String;
    author: { type: MongooseSchema.Types.ObjectId, ref: 'User' };
}