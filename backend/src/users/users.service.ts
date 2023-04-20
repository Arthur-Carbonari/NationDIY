import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async createUser(email: string, username: string, password: string): Promise<User> {
        const createdUser = new this.userModel({email, username, password});
        
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
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
