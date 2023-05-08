import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { catchError, from, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { QuestionsService } from './questions.service';
import { Question } from './schema/question.schema';

@Controller('questions')
export class QuestionsController {

    constructor(private questionsService: QuestionsService) { }

    @Get()
    findAll(): Observable<Question[]> {
        return from(this.questionsService.findAll())
    }

    @Get(":id")
    findOne(@Param('id') questionId: string): Observable<Question | null> {
        return from(this.questionsService.findOne((questionId)))
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any): Observable<{success: boolean}> {

        const userId: string = req.user._id

        return this.questionsService.create(createQuestionDto, userId).pipe(
            map(() => ({ success: true })),
            catchError(() => of({ success: false })),
        );
    }
}
