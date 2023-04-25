import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { Question } from './schema/question.schema';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    ) { }

    findAll(): Promise<Question[]> {
        return this.questionModel.find().exec()
    }
    
    findOne(questionId: string): Promise<Question | null> {
        return this.questionModel.findById(questionId).exec()
    }

    create(createQuestionDto: CreateQuestionDto, userId: string): Promise<Question>{

        const {title, content, tags} = createQuestionDto

        const createdQuestion = new this.questionModel({ title, content, tags, author: userId });
        
        return createdQuestion.save()
    }
}
