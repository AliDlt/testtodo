import { User } from '../entities/user.entity';

export interface UserRepository {
    createUser(user: User): Promise<User>;
    findUserByUsername(username: string): Promise<User | null>;
    validateUser(username: string, password: string): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
