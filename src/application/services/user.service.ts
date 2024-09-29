import { Inject, Injectable } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async registerUser(username: string, password: string): Promise<User> {
        const id = this.generateUserId();
        const user = new User(id, username, password);
        return this.userRepository.createUser(user);
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findUserByUsername(username);
    }

    private generateUserId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
}
