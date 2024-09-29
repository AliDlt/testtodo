import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList } from 'src/domain/entities/todo-list.entity';

@Injectable()
export class TodoListMongoRepository {
    constructor(
        @InjectModel('TodoList') private readonly todoListModel: Model<TodoList>,
    ) { }

    async createTodoList(todoList: TodoList): Promise<TodoList> {
        const createdTodoList = new this.todoListModel(todoList);
        return await createdTodoList.save();
    }

    async findTodoListsByUser(userId: string): Promise<TodoList[]> {
        return await this.todoListModel.find({ userId }).exec();
    }

    async updateTodoList(id: string, updateData: any): Promise<TodoList> {
        return await this.todoListModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).exec();
    }

    async deleteTodoList(id: string): Promise<void> {
        await this.todoListModel.findByIdAndDelete(id).exec();
    }
}
