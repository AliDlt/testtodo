import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListsQuery } from '../queries/get-todo-lists.query';
import { TodoListService } from '../services/todo-list.service';

@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
    constructor(private readonly todoListService: TodoListService) { }

    async execute(query: GetTodoListsQuery) {
        const { userId } = query;
        return this.todoListService.getTodoListsByUser(userId);
    }
}
