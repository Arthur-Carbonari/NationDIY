import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment } from '../comment.interface'


// Mongoose schema for an Answer to be store in the database
// Each property of the Answer document is defined using the @Prop() decorator.
// The SchemaFactory.createForClass method is used to create a Mongoose schema based on the TypeScript class definition.

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
    upvotes:Map<string, boolean>;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    downvotes:Map<string, boolean>;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
