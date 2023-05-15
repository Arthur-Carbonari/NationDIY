import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { User } from './schema/user.schema';

// This is a service class that provides methods to interact with the user data in the database.

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async createUser(email: string, username: string, password: string): Promise<User> {
        const createdUser = new this.userModel({ email, username, password });

        return createdUser.save();
    }

    async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
        return await this.userModel.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] })
    }

    async findByEmail(email: string) {
        return from(this.userModel.findOne({ email }).exec()).pipe();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async getProfile(userId: string){
        const user = await this.userModel.findById(userId).populate({path: "questions", populate: { path: "author", select: 'username _id' }})

        return user
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async update(id: string, user: User): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
        if (!updatedUser) {
            throw new Error(`User with ID ${id} not found`);
        }
        return updatedUser;
    }

    async delete(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
