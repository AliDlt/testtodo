import { Controller, Post, Body, Param, Delete, Patch, Get } from '@nestjs/common';
import { TodoListService } from '../../application/services/todo-list.service';
import { CreateTodoListDto } from '../../interfaces/dto/create-todo-list.dto';
import { AddTodoItemDto } from '../../interfaces/dto/add-todo-item.dto';
import { UpdatePriorityDto } from '../../interfaces/dto/update-priority.dto';

@Controller('todo-lists')
export class TodoListController {
    constructor(private readonly todoListService: TodoListService) { }

    @Post()
    async createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
        return this.todoListService.createTodoList(createTodoListDto.userId, createTodoListDto.title);
    }

    @Post(':id/items')
    async addTodoItem(@Param('id') todoListId: string, @Body() addTodoItemDto: AddTodoItemDto) {
        return this.todoListService.addTodoItem(
            todoListId,
            addTodoItemDto.title,
            addTodoItemDto.description,
            addTodoItemDto.priority,
        );
    }

    @Get(':userId')
    async getTodoLists(@Param('userId') userId: string) {
        return this.todoListService.getTodoListsByUser(userId);
    }

    @Patch(':id/priority')
    async updateTodoItemPriority(@Param('id') todoListId: string, @Body() updatePriorityDto: UpdatePriorityDto) {
        return this.todoListService.updateTodoItemPriority(
            todoListId,
            updatePriorityDto.todoItemId,
            updatePriorityDto.priority,
        );
    }

    @Delete(':id')
    async deleteTodoList(@Param('id') id: string) {
        return this.todoListService.deleteTodoList(id);
    }
}
