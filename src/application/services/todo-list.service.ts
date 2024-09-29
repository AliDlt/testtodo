import { Inject, Injectable } from '@nestjs/common';
import { TodoListRepository, TODO_LIST_REPOSITORY } from '../../domain/repositories/todo-list.repository';
import { TodoList } from '../../domain/entities/todo-list.entity';
import { TodoItem } from '../../domain/entities/todo-item.entity';

@Injectable()
export class TodoListService {
    constructor(
        @Inject(TODO_LIST_REPOSITORY)
        private readonly todoListRepository: TodoListRepository,
    ) { }

    async createTodoList(userId: string, title: string): Promise<TodoList> {
        const todoList = new TodoList(null, userId, title, []);
        return this.todoListRepository.createTodoList(todoList);
    }

    async getTodoListsByUser(userId: string): Promise<TodoList[]> {
        return this.todoListRepository.findTodoListsByUser(userId);
    }

    async updateTodoList(id: string, updateData: any): Promise<TodoList> {
        return this.todoListRepository.updateTodoList(id, updateData);
    }

    async deleteTodoList(id: string): Promise<void> {
        await this.todoListRepository.deleteTodoList(id);
    }

    async addTodoItem(todoListId: string, title: string, description: string, priority: number): Promise<TodoItem> {
        const todoItem = new TodoItem(null, todoListId, title, description, priority);
        const todoList = await this.todoListRepository.updateTodoList(todoListId, {
            $push: { todoItems: todoItem },
        });
        return todoList.todoItems[todoList.todoItems.length - 1];
    }

    async updateTodoItemPriority(todoListId: string, todoItemId: string, priority: number): Promise<TodoList> {
        const updateData = {
            'todoItems.$[item].priority': priority,
        };

        const options = {
            arrayFilters: [{ 'item._id': todoItemId }],
        };

        const todoList = await this.todoListRepository.updateTodoList(todoListId, updateData, options);
        return todoList;
    }
}
