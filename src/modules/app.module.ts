import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule
import { UserModule } from './user.module';
import { TodoListModule } from './todo-list.module';
import { CreateTodoListHandler } from '../application/handlers/create-todo-list.handler';
import { GetTodoListsHandler } from '../application/handlers/get-todo-lists.handler';
import { UserRegistrationSaga } from '../application/sagas/user-registration.saga';

@Module({
    imports: [
        // Initialize ConfigModule to load .env variables
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        // Use ConfigService to get MONGO_URI from the .env file
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),

        CqrsModule,
        UserModule,
        TodoListModule,
    ],
    providers: [
        CreateTodoListHandler,
        GetTodoListsHandler,
        UserRegistrationSaga,
    ],
})
export class AppModule { }
