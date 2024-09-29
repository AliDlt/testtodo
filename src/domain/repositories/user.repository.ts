import { User } from '../entities/user.entity';

export interface UserRepository {
    createUser(user: User): Promise<User>;
    findUserByUsername(username: string): Promise<User | null>;
}
