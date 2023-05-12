import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag extends Document{

    @Prop({ type: String, required: true, lowercase: true })
    _id: string;

    @Prop({ type: Map, of: Boolean, default: new Map() })
    questionIds:Map<string, boolean>;

}

export const TagSchema = SchemaFactory.createForClass(Tag);
