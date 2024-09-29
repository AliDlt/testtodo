import { TodoList } from '../entities/todo-list.entity';

export interface TodoListRepository {
    createTodoList(todoList: TodoList): Promise<TodoList>;
    findTodoListsByUser(userId: string): Promise<TodoList[]>;
    updateTodoList(id: string, updateData: any): Promise<TodoList>;
    deleteTodoList(id: string): Promise<void>;
}
