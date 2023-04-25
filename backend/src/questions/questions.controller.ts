import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { from, Observable } from 'rxjs';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { QuestionsService } from './questions.service';
import { Question } from './schema/question.schema';

@Controller('questions')
export class QuestionsController {

    constructor(private questionsService: QuestionsService){}

    @Get()
    findAll(): Observable<Question[]>{
        return from(this.questionsService.findAll())
    }

    @Get(":id")
    findOne(@Param('id') questionId: string): Observable<Question | null>{
        return from(this.questionsService.findOne((questionId)))
    }

    @Post()
    @UseGuards(AuthGuard())
    create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any){
        
        const userId: string = req.user._id
                
        return from(this.questionsService.create(createQuestionDto, userId))
    }
}
