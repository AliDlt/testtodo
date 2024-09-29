import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../application/services/user.service';
import { UserSchema } from '../infrastructure/database/schemas/user.schema';
import { UserMongoRepository } from '../infrastructure/repository/mongo/user.mongo.repository';
import { USER_REPOSITORY } from '../domain/repositories/user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    providers: [
        UserService,
        {
            provide: USER_REPOSITORY,
            useClass: UserMongoRepository,
        },
    ],
    exports: [UserService],
})
export class UserModule { }
