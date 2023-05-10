import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment } from '../questions.interface'

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
    @Prop({ required: true })
    content: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }], default: [] })
    comments: Comment[];

    @Prop({ type: Map, of: Boolean, default: new Map() })
    upvotes:Map<MongooseSchema.Types.ObjectId, boolean>;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    downvotes:Map<MongooseSchema.Types.ObjectId, boolean>;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    author: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Question', required: true })
    question: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
