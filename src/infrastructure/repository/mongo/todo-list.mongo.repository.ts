import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { TodoList } from 'src/domain/entities/todo-list.entity';

@Injectable()
export class TodoListMongoRepository implements TodoListRepository {
    constructor(
        @InjectModel('TodoList') private readonly todoListModel: Model<TodoList>,
    ) { }

    async createTodoList(todoList: TodoList): Promise<TodoList> {
        const createdTodoList = new this.todoListModel(todoList);
        return createdTodoList.save();
    }

    async findTodoListsByUser(userId: string): Promise<TodoList[]> {
        return this.todoListModel.find({ userId }).exec();
    }

    async updateTodoList(id: string, updateData: any, options: any = {}): Promise<TodoList> {
        return this.todoListModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, ...options }
        ).exec();
    }

    async deleteTodoList(id: string): Promise<void> {
        await this.todoListModel.findByIdAndDelete(id).exec();
    }
}
