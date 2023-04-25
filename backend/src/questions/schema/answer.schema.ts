import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Vote, Comment } from '../questions.interface'

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
    @Prop({ required: true })
    content: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }], default: [] })
    comments: Comment[];

    @Prop({ type: [{ vote: Number, userId: { type: MongooseSchema.Types.ObjectId, ref: 'User' } }], default: [] })
    votes: Vote[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    author: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Question', required: true })
    question: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
