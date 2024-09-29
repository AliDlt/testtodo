import { Controller, Post, Body, Param, Delete, Patch, Get } from '@nestjs/common';
import { TodoListService } from '../../application/services/todo-list.service';
import { CreateTodoListDto } from '../../interfaces/dto/create-todo-list.dto';

@Controller('todo-lists')
export class TodoListController {
    constructor(private readonly todoListService: TodoListService) { }

    @Post()
    async createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
        return this.todoListService.createTodoList(createTodoListDto.userId, createTodoListDto.title);
    }

    @Get(':userId')
    async getTodoLists(@Param('userId') userId: string) {
        return this.todoListService.getTodoListsByUser(userId);
    }

    @Patch(':id')
    async updateTodoList(@Param('id') id: string, @Body() updateData: any) {
        return this.todoListService.updateTodoList(id, updateData);
    }

    @Delete(':id')
    async deleteTodoList(@Param('id') id: string) {
        return this.todoListService.deleteTodoList(id);
    }
}
