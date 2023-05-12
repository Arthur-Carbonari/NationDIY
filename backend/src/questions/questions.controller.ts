import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { catchError, from, map, Observable, of } from 'rxjs';
import { PostAnswerDto } from 'src/auth/dto/post-answer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { VoteDto } from './dto/vote.dto';
import { QuestionsService } from './questions.service';
import { Answer } from './schema/answer.schema';
import { Question } from './schema/question.schema';

@Controller('questions')
export class QuestionsController {

    constructor(private questionsService: QuestionsService) { }

    @Get()
    findAll(): Observable<Question[]> {
        return from(this.questionsService.findAll())
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any): Observable<{ success: boolean }> {

        const userId: string = req.user._id

        return from(this.questionsService.create(createQuestionDto, userId)).pipe(
            map(() => ({ success: true })),
            catchError(() => of({ success: false })),
        );
    }

    @Get(":id")
    async findOne(@Param('id') questionId: string) {
        const question = await this.questionsService.findOne((questionId))

        if (!question) return

        return question
    }

    @Patch(":id/vote")
    @UseGuards(JwtAuthGuard)
    vote(@Body() voteDto: VoteDto, @Req() req: any, @Param('id') questionId: string): Observable<{ success: boolean }> {
        const userId: string = req.user._id

        return from(this.questionsService.vote(voteDto, userId, questionId)).pipe(
            map((success) => ({ success })),
            catchError(() => of({ success: false })),
        );
    }

    @Post(":id/answers")
    @UseGuards(JwtAuthGuard)
    postAnswer(@Body() postAnswerDto: PostAnswerDto, @Req() req: any, @Param('id') questionId: string) {
        const userId: string = req.user._id
        return this.questionsService.postAnswer(postAnswerDto, userId, questionId)
    }

    @Get(":id/answers")
    getAnswers(@Param('id') questionId: string): Promise<Answer[]> {
        return this.questionsService.findAnswers(questionId)
    }

    @Patch(":id/answers/:answerId/vote")
    @UseGuards(JwtAuthGuard)
    voteAnswer(@Body() voteDto: VoteDto, @Req() req: any, @Param("answerId") answerId: string): Observable<{ success: boolean }> {
        const userId: string = req.user._id

        return from(this.questionsService.voteAnswer(voteDto, userId, answerId)).pipe(
            map((success) => ({ success })),
            catchError(() => of({ success: false })),
        );
    }

}
