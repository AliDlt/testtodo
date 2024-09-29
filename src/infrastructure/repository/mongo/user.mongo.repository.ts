import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserMongoRepository implements UserRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    async createUser(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username }).exec();
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.findUserByUsername(username);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}
