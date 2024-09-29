// user.mongo.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

// Define Mongoose Document for User entity, omitting 'id' to avoid conflict with Mongoose Document
interface UserDocument extends Omit<User, 'id'>, Document { }

@Injectable()
export class UserMongoRepository implements UserRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) { }

    // Helper function to convert Mongoose document to plain User object
    private toUser(userDocument: UserDocument): User {
        const { _id, username, password, todoLists } = userDocument;
        return {
            id: _id.toString(),
            username,
            password,
            todoLists: todoLists || [],
        };
    }

    async createUser(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        const savedUser = await createdUser.save();
        return this.toUser(savedUser);
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const userDocument = await this.userModel.findOne({ username }).exec();
        return userDocument ? this.toUser(userDocument) : null;
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.findUserByUsername(username);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}
