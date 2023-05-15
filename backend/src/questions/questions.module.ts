import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question, QuestionSchema } from './schema/question.schema';
import { Answer, AnswerSchema } from './schema/answer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Tag, TagSchema } from './schema/tag.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';

/**
 * @method forFeature() used to register Mongoose schemas for Question, Answer, and Tag. These schemas define the structure of documents that will be stored in a MongoDB database.
 */

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [QuestionsService], //responsible for handling business logic related to questions and answers.
  controllers: [QuestionsController],  // responsible for handling incoming HTTP requests related to questions and answers.
})
export class QuestionsModule { }
