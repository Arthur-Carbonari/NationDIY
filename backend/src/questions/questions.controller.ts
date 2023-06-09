import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { catchError, from, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AcceptAnswerDto } from './dto/accept-answer-dto';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { PostAnswerDto } from './dto/post-answer.dto';
import { PostCommentDto } from './dto/post-comment-dto';
import { VoteDto } from './dto/vote.dto';
import { QuestionsService } from './questions.service';
import { Answer } from './schema/answer.schema';
import { Question } from './schema/question.schema';

/**
 * This is a NestJS controller for a Questions feature in a web application. It handles various HTTP requests related to questions, including getting questions, creating a question, getting a single question, deleting a question, voting on a question, accepting an answer, posting an answer, getting answers, deleting an answer, voting on an answer, posting a comment on a question, and posting a comment on an answer.

It uses various NestJS decorators to define the route paths and request methods, as well as guards to ensure that only authenticated users can perform certain actions. It also uses DTOs (data transfer objects) to validate and sanitize the incoming request data before passing it on to the service layer.

The controller methods mostly delegate to corresponding methods in the QuestionsService class, which is responsible for interacting with the database and implementing the business logic for the Questions feature.
 **/

@Controller('questions')
export class QuestionsController {

    constructor(private questionsService: QuestionsService) { }

    @Get()
    getQuestions(@Query('tag') tag="",){
        return this.questionsService.getQuestions(tag)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any): Observable<{ success: boolean }> {

        const userId = req.user._id

        return from(this.questionsService.create(createQuestionDto, userId)).pipe(
            map(() => ({ success: true })),
            catchError(() => of({ success: false })),
        );
    }

    @Get("tags")
    async getTags() {
        return this.questionsService.getTags()
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
        const userId = req.user._id

        const sucess = await this.questionsService.deleteIfOwner(questionId, userId)

        return {sucess}
    }

    @Patch(":id/vote")
    @UseGuards(JwtAuthGuard)
    vote(@Body() voteDto: VoteDto, @Req() req: any, @Param('id') questionId: string): Observable<{ success: boolean }> {
        const userId = req.user._id

        return from(this.questionsService.vote(voteDto, userId, questionId)).pipe(
            map((success) => ({ success })),
            catchError(() => of({ success: false })),
        );
    }

    @Patch(":id/accept-answer")
    @UseGuards(JwtAuthGuard)
    acceptAnswer(@Body() acceptAnswerDto: AcceptAnswerDto, @Req() req: any, @Param('id') questionId: string): Observable<{ success: boolean }> {
        const userId = req.user._id        

        return from(this.questionsService.acceptAnswer(acceptAnswerDto, userId, questionId)).pipe(
            map((success) => ({ success })),
            catchError(() => of({ success: false })),
        );
    }

    @Post(":id/answers")
    @UseGuards(JwtAuthGuard)
    postAnswer(@Body() postAnswerDto: PostAnswerDto, @Req() req: any, @Param('id') questionId: string) {        
        const userId = req.user._id
        return this.questionsService.postAnswer(postAnswerDto, questionId, userId)
    }

    @Get(":id/answers")
    getAnswers(@Param('id') questionId: string): Promise<Answer[]> {
        return this.questionsService.findAnswers(questionId)
    }

    @Delete(":id/answers/:answerId")
    @UseGuards(JwtAuthGuard)
    async deleteAnswer(@Param('id') answerId: string, @Req() req: any) {
        const userId = req.user._id

        const sucess = await this.questionsService.deleteAnswerIfOwner(answerId, userId)

        return {sucess}
    }

    @Patch(":id/answers/:answerId/vote")
    @UseGuards(JwtAuthGuard)
    voteAnswer(@Body() voteDto: VoteDto, @Req() req: any, @Param("answerId") answerId: string): Observable<{ success: boolean }> {
        const userId = req.user._id

        return from(this.questionsService.voteAnswer(voteDto, userId, answerId)).pipe(
            map((success) => ({ success })),
            catchError(() => of({ success: false })),
        );
    }

    @Post(":id/comments")
    @UseGuards(JwtAuthGuard)
    postComment(@Body() postCommentDto: PostCommentDto, @Req() req: any, @Param('id') questionId: string) {        
        const {_id , username} = req.user
        return this.questionsService.postComment(postCommentDto, questionId, _id, username)
    }

    @Post(":id/answers/:answerId/comments")
    @UseGuards(JwtAuthGuard)
    postAnswerComment(@Body() postCommentDto: PostCommentDto, @Req() req: any, @Param('answerId') answerId: string) {        
        const {_id , username} = req.user
        return this.questionsService.postAnswerComment(postCommentDto, answerId, _id, username)
    }

}
