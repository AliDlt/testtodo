import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from './user.module';
import { TodoListModule } from './todo-list.module';
import { CreateTodoListHandler } from '../application/handlers/create-todo-list.handler';
import { GetTodoListsHandler } from '../application/handlers/get-todo-lists.handler';
import { UserRegistrationSaga } from '../application/sagas/user-registration.saga';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/todo-app'),
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
