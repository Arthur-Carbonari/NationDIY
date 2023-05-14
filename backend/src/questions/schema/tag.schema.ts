import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**  Mongoose schema for a tag to be store in the database
 *  Each property of the tag document is defined using the @Prop() decorator.
 *  The SchemaFactory.createForClass method is used to create a Mongoose schema based on the TypeScript class definition.
*/


@Schema()
export class Tag extends Document{

    @Prop({ type: String, required: true, lowercase: true })
    _id: string;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    questionIds:Map<string, boolean>;

}

export const TagSchema = SchemaFactory.createForClass(Tag);
