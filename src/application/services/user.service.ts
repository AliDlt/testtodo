import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../../modules/user.module';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async registerUser(username: string, password: string): Promise<User> {
        const user = new User(null, username, password);
        return this.userRepository.createUser(user);
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findUserByUsername(username);
    }
}
