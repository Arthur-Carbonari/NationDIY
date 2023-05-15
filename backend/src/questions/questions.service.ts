import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Query } from 'mongoose';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { Question } from './schema/question.schema';
import { VoteDto } from './dto/vote.dto';
import { Answer } from './schema/answer.schema';
import { Tag } from './schema/tag.schema';
import { from } from 'rxjs';
import { AcceptAnswerDto } from './dto/accept-answer-dto';
import { PostAnswerDto } from './dto/post-answer.dto';
import { PostCommentDto } from './dto/post-comment-dto';

/**
 * 
This is a NestJS service class for handling questions and answers. It defines methods for creating, retrieving, updating, and deleting questions and answers, as well as adding tags to questions, voting on questions and answers, and accepting answers to questions.
 */

// decorator for injecting Mongoose models, 
@Injectable()
export class QuestionsService {

    constructor(
        @InjectModel(Question.name) private readonly questionModel: Model<Question>,
        @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
        @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
    ) { }

    //returns an array of questions, optionally filtered by a tag.
    async getQuestions(tag: string) {

        const query = this.questionModel.find()

        if (tag) {
            const tagDocument = (await this.tagModel.findById(tag))

            if (!tagDocument) return { questions: []}

            const questionIds = Array.from(tagDocument.questionIds.keys())

            query.find({ _id: { $in: questionIds } });
        }

        const questions = await query.populate('author', 'username').exec();

        return questions
    }

    // returns a single question by ID.
    findOne(questionId: string): Promise<Question | null> {
        return this.questionModel.findById(questionId).populate('author', 'username').exec()
    }

    //creates a new question.
    async create(createQuestionDto: CreateQuestionDto, userId: string) {

        const { title, body } = createQuestionDto

        const tags = createQuestionDto.tags?.length ? createQuestionDto.tags : undefined

        // check model to create using parameters
        const createdQuestion = await this.questionModel.create({ title, body, tags, author: userId });

        await this.addQuestionToTags(createdQuestion._id, createdQuestion.tags)

        return createdQuestion
    }

    // delete if owner, based on id 
    async deleteIfOwner(questionId: string, userId: string) {
        // find of question 
        const question = await this.questionModel.findById(questionId)
        //match user id with question author id 
        if (!(question && String(question.author) == String(userId))) {
            return false
        }

        const answerIds = question.answers

        await question.deleteOne();
        await this.answerModel.deleteMany({ _id: { $in: answerIds } });

        return true
    }
    // save questions into tags 
    async addQuestionToTags(questionId: string, tags: string[]) {
        tags.forEach(async (tagName) => {
            let tag = await this.tagModel.findById(tagName.toLowerCase()).exec()

            if (!tag) tag = await this.tagModel.create({ _id: tagName })

            tag.questionIds.set(questionId, true)

            await tag.save()
        })
    }
    // vote data transfer object 
    async vote(voteDto: VoteDto, userId: string, questionId: string) {

        const { value } = voteDto

        const question = await this.questionModel.findById(questionId).exec()

        if (!question) return false

        question.upvotes.delete(userId)
        question.downvotes.delete(userId)
        // verify if up or down vote based on value 
        if (value > 0) {
            question.upvotes.set(userId, true)
        }
        else if (value < 0) {
            question.downvotes.set(userId, true)
        }
        // save question 
        await question.save()

        return true
    }

    //post answer of a question 
    async postAnswer(postAnswerDto: PostAnswerDto, questionId: string, userId: string) {
        const question = await this.questionModel.findById(questionId).exec()

        if (!question) return { success: false }

        const newAnswer = await (await this.answerModel.create({ body: postAnswerDto.body, author: userId, question: questionId })).populate('author', 'username')

        question.answers.push(newAnswer._id)
        await question.save()

        return newAnswer
    }
    // find answer with id 
    async findAnswers(questionId: string): Promise<Answer[]> {

        const question = await this.questionModel.findById(questionId).exec()

        if (!question) return []

        return this.answerModel.find({ _id: { $in: question.answers } }).populate('author', 'username').exec();
    }

    // accepts an answer to a question if the requester is the owner.
    async acceptAnswer(acceptAnswerDto: AcceptAnswerDto, userId: ObjectId, questionId: string) {
        const question = await this.questionModel.findById(questionId).exec()

        if (!question) return false

        if (String(question.author) !== String(userId)) return false

        const { answerId } = acceptAnswerDto

        if (!question.answers.map(answer => String(answer)).includes(answerId)) return false

        question.acceptedAnswer = answerId

        await question.save()

        return true
    }

    //deletes an answer if the requester is the owner.
    async deleteAnswerIfOwner(answerId: string, userId: string) {
        const answer = await this.answerModel.findById(answerId)

        if (!(answer && String(answer.author) == String(userId))) {
            return false
        }

        const questionId = answer.question

        await answer.deleteOne();

        const question = await this.questionModel.findById(questionId)

        if (question) {
            question.answers = question.answers.filter(a => String(a) !== String(answerId))
            await question.save()
        }

        return true
    }
    
    // records a vote on an answer
    async voteAnswer(voteDto: VoteDto, userId: string, answerId: string) {
        const { value } = voteDto

        const answer = await this.answerModel.findById(answerId).exec()

        if (!answer) return false

        answer.upvotes.delete(userId)
        answer.downvotes.delete(userId)

        if (value > 0) {
            answer.upvotes.set(userId, true)
        }
        else if (value < 0) {
            answer.downvotes.set(userId, true)
        }

        await answer.save()

        return true
    }
    // return all tags mapped in the select question id
    async getTags() {
        return (await this.tagModel.find().select('_id').exec()).map(tag => {
            return tag._id
        });
    }

    // post comment in the question 
    async postComment(postCommentDto: PostCommentDto, questionId: string, userId: ObjectId, username: string){
        const question = await this.questionModel.findById(questionId).exec()

        if(!question) return {success: false}

        const newComment = {
            body: postCommentDto.body,
            author: {_id: userId, username},
            createdAt: new Date(),
        }
        
        question.comments.push(newComment)

        await question.save()        

        return {success: true, newComment}
    }
    // post comment in the specific aswer 
    async postAnswerComment(postCommentDto: PostCommentDto, answerId: string, userId: any, username: any) {

        const answer = await this.answerModel.findById(answerId).exec()

        if(!answer) return {success: false}

        const newComment = {
            body: postCommentDto.body,
            author: {_id: userId, username},
            createdAt: new Date(),
        }
        
        answer.comments.push(newComment)

        await answer.save()        

        return {success: true, newComment}

    }

}
