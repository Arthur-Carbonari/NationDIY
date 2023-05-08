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

    create(createQuestionDto: CreateQuestionDto, userId: string){

        const {title, body} = createQuestionDto
        
        const tags = createQuestionDto.tags?.length ? createQuestionDto.tags : undefined  

        const createdQuestion = new this.questionModel({ title, body, tags, author: userId });
                
        return from(createdQuestion.save())
    }
}
