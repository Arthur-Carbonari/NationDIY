import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Query } from 'mongoose';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { Question } from './schema/question.schema';
import { VoteDto } from './dto/vote.dto';
import { Answer } from './schema/answer.schema';
import { PostAnswerDto } from 'src/auth/dto/post-answer.dto';
import { Tag } from './schema/tag.schema';
import { from } from 'rxjs';
import { AcceptAnswerDto } from 'src/auth/dto/accept-answer-dto';


@Injectable()
export class QuestionsService {

    constructor(
        @InjectModel(Question.name) private readonly questionModel: Model<Question>,
        @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
        @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
    ) { }

    async getQuestions(pageNumber: number, pageSize: number, tag: string) {

        const query = this.questionModel.find()

        if (tag) {
            const tagDocument = (await this.tagModel.findById(tag))

            if (!tagDocument) return { questions: [], totalMatches: 0 }

            const questionIds = Array.from(tagDocument.questionIds.keys())

            query.find({ _id: { $in: questionIds } });
        }

        const skip = pageNumber * pageSize;

        const totalMatches = await query.clone().countDocuments()
        const questions = await query.sort({ createAt: -1 }).skip(skip).limit(pageSize).populate('author', 'username').exec();

        console.log(questions);


        return { questions, totalMatches }
    }

    findOne(questionId: string): Promise<Question | null> {
        return this.questionModel.findById(questionId).populate('author', 'username').exec()
    }

    async create(createQuestionDto: CreateQuestionDto, userId: string) {

        const { title, body } = createQuestionDto

        const tags = createQuestionDto.tags?.length ? createQuestionDto.tags : undefined

        const createdQuestion = await this.questionModel.create({ title, body, tags, author: userId });

        await this.addQuestionToTags(createdQuestion._id, createdQuestion.tags)

        return createdQuestion
    }

    async deleteIfOwner(questionId: string, userId: string) {

        const question = await this.questionModel.findById(questionId)

        if (!(question && String(question.author) == String(userId))) {
            return false
        }

        const answerIds = question.answers

        await question.deleteOne();
        await this.answerModel.deleteMany({ _id: { $in: answerIds } });

        return true
    }

    async addQuestionToTags(questionId: string, tags: string[]) {
        tags.forEach(async (tagName) => {
            let tag = await this.tagModel.findById(tagName.toLowerCase()).exec()

            if (!tag) tag = await this.tagModel.create({ _id: tagName })

            tag.questionIds.set(questionId, true)

            await tag.save()
        })
    }

    async vote(voteDto: VoteDto, userId: string, questionId: string) {

        const { value } = voteDto

        const question = await this.questionModel.findById(questionId).exec()

        if (!question) return false

        question.upvotes.delete(userId)
        question.downvotes.delete(userId)

        if (value > 0) {
            question.upvotes.set(userId, true)
        }
        else if (value < 0) {
            question.downvotes.set(userId, true)
        }

        await question.save()

        return true
    }

    async postAnswer(postAnswerDto: PostAnswerDto, questionId: string, userId: string) {
        const question = await this.questionModel.findById(questionId).exec()

        if (!question) return { success: false }

        const newAnswer = await (await this.answerModel.create({ body: postAnswerDto.body, author: userId, question: questionId })).populate('author', 'username')

        question.answers.push(newAnswer._id)
        await question.save()

        return newAnswer
    }

    async findAnswers(questionId: string): Promise<Answer[]> {

        const question = await this.questionModel.findById(questionId).exec()

        if (!question) return []

        return this.answerModel.find({ _id: { $in: question.answers } }).populate('author', 'username').exec();
    }

    async acceptAnswer(acceptAnswerDto: AcceptAnswerDto, userId: ObjectId, questionId: string){
        const question = await this.questionModel.findById(questionId).exec()

        if(!question) return false

        if(String(question.author) !== String(userId)) return false
        
        const {answerId} = acceptAnswerDto
        
        if(!question.answers.map(answer => String(answer)).includes(answerId)) return false

        question.acceptedAnswer = answerId

        await question.save()

        return true
    }

    async deleteAnswerIfOwner(answerId: string, userId: string) {
        const answer = await this.answerModel.findById(answerId)

        if (!(answer && String(answer.author) == String(userId))) {
            return false
        }

        const questionId = answer.question

        await answer.deleteOne();

        const question = await this.questionModel.findById(questionId)

        if(question){
            question.answers = question.answers.filter(a => String(a) !== String(answerId))
            await question.save()
        }

        return true
    }

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


}
