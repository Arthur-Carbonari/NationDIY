import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { catchError, from, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { VoteDto } from './dto/vote.dto';
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
    async findOne(@Param('id') questionId: string) {
        const question = await this.questionsService.findOne((questionId))

        if(!question) return

        return question
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

    @Post(":id/answers")
    @UseGuards(JwtAuthGuard)
    postAnswer(@Body() postAnswerDto: any, @Req() req: any, @Param('id') questionId: string){
        const userId: string = req.user._id
        return this.questionsService.postAnswer(postAnswerDto, questionId, userId)
    }

    @Get(":id/answers")
    getAnswers(@Param('id') questionId: string){
        return this.questionsService.findAnswers(questionId)
    }

    @Patch(":id/vote")
    @UseGuards(JwtAuthGuard)
    vote(@Body() voteDto: VoteDto, @Req() req: any, @Param('id') questionId: string): Observable<{success: boolean}>{        
        const userId: string = req.user._id

        return from(this.questionsService.vote(voteDto, questionId, userId)).pipe(
            map((success) => ({ success })),
            catchError(() => of({ success: false })),
        );
    }
}
