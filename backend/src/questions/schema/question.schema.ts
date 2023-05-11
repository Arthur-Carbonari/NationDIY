import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Comment } from '../questions.interface'

@Schema()
export class Question extends Document {

    @Prop({ required: true })
    title: string;
    
    @Prop({ type: [String], default: ['misc'] })
    tags: string[];

    @Prop({ required: true })
    body: string;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    upvotes:Map<MongooseSchema.Types.ObjectId, boolean>;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    downvotes:Map<MongooseSchema.Types.ObjectId, boolean>;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Answer' }], default: [] })
    answers: string[];

    @Prop({ type: [{ content: String, author: { type: MongooseSchema.Types.ObjectId, ref: 'User' } }], default: [] })
    comments: Comment[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    author: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Answer', default: null })
    acceptedAnswer: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);