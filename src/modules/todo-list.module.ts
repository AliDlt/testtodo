import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListController } from '../interfaces/controllers/todo-list.controller';
import { TodoListService } from '../application/services/todo-list.service';
import { TodoListSchema } from '../infrastructure/database/schemas/todo-list.schema';
import { TodoListMongoRepository } from '../infrastructure/repository/mongo/todo-list.mongo.repository';

export const TODO_LIST_REPOSITORY = 'TODO_LIST_REPOSITORY';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'TodoList', schema: TodoListSchema }])],
    controllers: [TodoListController],
    providers: [
        TodoListService,
        {
            provide: TODO_LIST_REPOSITORY,
            useClass: TodoListMongoRepository,
        }
    ],
    exports: [TodoListService],
})
export class TodoListModule { }
