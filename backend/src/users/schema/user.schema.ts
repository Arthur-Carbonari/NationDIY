import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

import ErrorMessage from '../../common/constants/error-messages';

export type UserDocument = User & Document;

@Schema()
export class User {

  _id: string

  @Prop({ 
    required: [true, ErrorMessage.REQUIRED_FIELD_EMPTY],
    unique: [true, ErrorMessage.USERNAME_TAKEN], 
    minlength: [5, ErrorMessage.USERNAME_MIN_LENGTH]
  })
  username: string;

  @Prop({
    required: [true, ErrorMessage.REQUIRED_FIELD_EMPTY],
    validate: [validator.isStrongPassword, ErrorMessage.WEAK_PASSWORD]
  })
  password: string;

  @Prop({
    unique: [true, ErrorMessage.EMAIL_ALREADY_REGISTERED],
    required: [true, ErrorMessage.REQUIRED_FIELD_EMPTY],
    validate: [validator.isEmail, ErrorMessage.INVALID_EMAIL]
  })
  email: string;

  @Prop({ default: false })
  adminRights: boolean;

  @Prop({
    default: null,
    validate: [ (value: string) => { value === null || validator.isURL(value)}, ErrorMessage.INVALID_URL],
  })
  profileImageURL: string;

  @Prop({ type: [String], default: [] })
  notifications: string[];

  @Prop({ type: [{ type: String, ref: 'Question' }], default: [] })
  questions: string[];

  @Prop({ type: [{ type: String, ref: 'Answer' }], default: [] })
  answers: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
