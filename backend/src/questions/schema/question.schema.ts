import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment as Comment_ } from '../comment.interface';

/**  Mongoose schema for an Question to be store in the database
 *  Each property of the Question document is defined using the @Prop() decorator.
 *  The SchemaFactory.createForClass method is used to create a Mongoose schema based on the TypeScript class definition.
*/

@Schema()
export class Question extends Document {

    @Prop({ required: true })
    title: string;
    
    @Prop({ type: [String], default: ['misc'] })
    tags: string[];

    @Prop({ required: true })
    body: string;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    upvotes:Map<string, boolean>;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    downvotes:Map<string, boolean>;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Answer' }], default: [] })
    answers: string[];

    @Prop({ default: [] })
    comments: Comment_[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    author: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Answer', default: null })
    acceptedAnswer: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);