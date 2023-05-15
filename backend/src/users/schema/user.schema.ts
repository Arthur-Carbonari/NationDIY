import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';
import * as bcrypt from "bcrypt";

import ErrorMessage from '../../common/constants/error-messages';


/**
 *  Mongoose schema for an User to be store in the database
 *  Each property of the User document is defined using the @Prop() decorator.
 *  The SchemaFactory.createForClass method is used to create a Mongoose schema based on the TypeScript class definition.
 *
  */

@Schema()
export class User extends Document {

  @Prop({
    required: [true, ErrorMessage.REQUIRED_FIELD_EMPTY],
    unique: [true, ErrorMessage.USERNAME_TAKEN],
    minlength: [5, ErrorMessage.USERNAME_MIN_LENGTH]
  })
  username: string;

  @Prop({
    required: [true, ErrorMessage.REQUIRED_FIELD_EMPTY],
    validate: [validator.isStrongPassword, ErrorMessage.WEAK_PASSWORD],
  })
  password: string;

  @Prop({
    unique: [true, ErrorMessage.EMAIL_ALREADY_REGISTERED],
    required: [true, ErrorMessage.REQUIRED_FIELD_EMPTY],
    validate: [validator.isEmail, ErrorMessage.INVALID_EMAIL],
    lowercase: [true]
  })
  email: string;

  @Prop({ default: false })
  adminRights: boolean;

  @Prop({
    default: null,
    validate: [(value: string) => { value === null || validator.isURL(value) }, ErrorMessage.INVALID_URL],
  })
  profileImageURL: string;

  @Prop({ type: [String], default: [] })
  notifications: string[];

  @Prop({ type: [{ type: String, ref: 'Question' }], default: [] })
  questions: string[];

  @Prop({ type: [{ type: String, ref: 'Answer' }], default: [] })
  answers: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
  };

}

const UserSchema = SchemaFactory.createForClass(User);

// always before saving the model in the db we check if it is needed to hash the passwor before saving it
UserSchema.pre('save', async function (next) {

  // Hashes the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next();
});

UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
};


export { UserSchema }
