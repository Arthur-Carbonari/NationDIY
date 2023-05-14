import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
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
    getQuestions(@Query('pageNumber') pageNumber=0, @Query('pageSize') pageSize=50, @Query('tag') tag="",){
        return from(this.questionsService.getQuestions(pageNumber, pageSize, tag))
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

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') questionId: string, @Req() req: any) {
        const userId: string = req.user._id

        const sucess = await this.questionsService.deleteIfOwner(questionId, userId)

        return {sucess}
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
        return this.questionsService.postAnswer(postAnswerDto, questionId, userId)
    }

    @Get(":id/answers")
    getAnswers(@Param('id') questionId: string): Promise<Answer[]> {
        return this.questionsService.findAnswers(questionId)
    }

    @Delete(":questionId/answers/:answerId")
    @UseGuards(JwtAuthGuard)
    async deleteAnswer(@Param('answerId') answerId: string, @Req() req: any) {
        const userId: string = req.user._id

        const sucess = await this.questionsService.deleteAnswerIfOwner(answerId, userId)

        return {sucess}
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
