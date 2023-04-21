import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Vote, Comment } from '../questions.interface'

export type QuestionDocument = Question & Document;

@Schema()
export class Question {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: [{ vote: Number, userId: { type: MongooseSchema.Types.ObjectId, ref: 'User' } }], default: [] })
    votes: Vote[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Answer' }], default: [] })
    answers: string[];

    @Prop({ type: [{ content: String, author: { type: MongooseSchema.Types.ObjectId, ref: 'User' } }], default: [] })
    comments: Comment[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    author: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Answer' })
    acceptedAnswer: string;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);