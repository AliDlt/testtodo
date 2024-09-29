import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListController } from 'src/interfaces/controllers/todo-list.controller';
import { TodoListService } from 'src/application/services/todo-list.service';
import { TodoListSchema } from 'src/infrastructure/database/schemas/todo-list.schema';
import { TodoListMongoRepository } from 'src/infrastructure/repository/mongo/todo-list.mongo.repository';
import { TODO_LIST_REPOSITORY } from 'src/domain/repositories/todo-list.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'TodoList', schema: TodoListSchema }]),
    ],
    controllers: [TodoListController],
    providers: [
        TodoListService,
        {
            provide: TODO_LIST_REPOSITORY,
            useClass: TodoListMongoRepository,
        },
    ],
    exports: [TodoListService],
})
export class TodoListModule { }
