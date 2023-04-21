import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { QuestionsService } from './questions.service';
import { Question } from './schema/question.schema';

@Controller('questions')
export class QuestionsController {

    constructor(private questionsService: QuestionsService){}

    @Get()
    findAll(): Observable<Question[]>{
        return this.questionsService.findAll()
    }
}
