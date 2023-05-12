import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment } from '../questions.interface'


@Schema()
export class Answer extends Document{
    @Prop({ required: true })
    body: string;
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    author: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Question', required: true })
    question: string;

    @Prop({ type: [{ content: String, author: { type: MongooseSchema.Types.ObjectId, ref: 'User' } }], default: [] })
    comments: Comment[];

    @Prop({ type: Map, of: Boolean, default: new Map() })
    upvotes:Map<MongooseSchema.Types.ObjectId, boolean>;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    downvotes:Map<MongooseSchema.Types.ObjectId, boolean>;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
