import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { Question } from './schema/question.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { VoteDto } from './dto/vote.dto';
import { Answer } from './schema/answer.schema';
import { PostAnswerDto } from 'src/auth/dto/post-answer.dto';


@Injectable()
export class QuestionsService {

    constructor(
        @InjectModel(Question.name) private readonly questionModel: Model<Question>,
        @InjectModel(Answer.name) private readonly answerModel: Model<Answer>
    ) { }

    findAll(): Promise<Question[]> {
        return this.questionModel.find().exec()
    }
    
    findOne(questionId: string): Promise<Question | null> {
        return this.questionModel.findById(questionId).exec()
    }

    create(createQuestionDto: CreateQuestionDto, userId: string){

        const {title, body} = createQuestionDto
        
        const tags = createQuestionDto.tags?.length ? createQuestionDto.tags : undefined  

        const createdQuestion = new this.questionModel({ title, body, tags, author: userId });
                
        return from(createdQuestion.save())
    }

    async vote(voteDto: VoteDto, userId: string, questionId: string) {
        
        const {value} = voteDto

        const question = await this.questionModel.findById(questionId).exec()

        if(!question) return false

        question.upvotes.delete(userId)
        question.downvotes.delete(userId)
        
        if(value > 0){
            question.upvotes.set(userId, true)
        }
        else if(value < 0){
            question.downvotes.set(userId, true)
        }

        await question.save()

        return true
    }

    async postAnswer(postAnswerDto: PostAnswerDto, questionId: string, userId: string){
        const question = await this.questionModel.findById(questionId).exec()

        if(!question) return {success: false}

        const newAnswer = await this.answerModel.create({body: postAnswerDto.body, author: userId, question: questionId})

        question.answers.push(newAnswer._id)
        await question.save()

        return newAnswer
    }

    async findAnswers(questionId: string): Promise<Answer[]> {

        const question = await this.questionModel.findById(questionId).exec()

        if(!question) return []
        
        return this.answerModel.find({ _id: { $in: question.answers } }).exec();        
    }

    async voteAnswer(voteDto: VoteDto, userId: string, answerId: string) {
        const {value} = voteDto

        const answer = await this.answerModel.findById(answerId).exec()

        if(!answer) return false

        answer.upvotes.delete(userId)
        answer.downvotes.delete(userId)
        
        if(value > 0){
            answer.upvotes.set(userId, true)
        }
        else if(value < 0){
            answer.downvotes.set(userId, true)
        }

        await answer.save()

        return true
    }
}
