import { TodoList } from 'src/domain/entities/todo-list.entity';

export interface TodoListRepository {
    createTodoList(todoList: TodoList): Promise<TodoList>;
    findTodoListsByUser(userId: string): Promise<TodoList[]>;
    updateTodoList(id: string, updateData: any, options?: any): Promise<TodoList>;
    deleteTodoList(id: string): Promise<void>;
}

export const TODO_LIST_REPOSITORY = Symbol('TODO_LIST_REPOSITORY');
