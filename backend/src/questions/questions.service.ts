import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { Question } from './schema/question.schema';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    ) { }

    findAll(): Observable<Question[]> {
        return from(this.questionModel.find().exec())
    }
    
    findOne(questionId: string): Observable<Question | null> {
        return from(this.questionModel.findById(questionId).exec())
    }
}
