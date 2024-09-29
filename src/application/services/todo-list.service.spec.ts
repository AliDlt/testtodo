import { Test, TestingModule } from '@nestjs/testing';
import { TodoListService } from '../services/todo-list.service';
import { TodoListRepository } from '../../domain/repositories/todo-list.repository';
import { CreateTodoListCommand } from '../../application/commands/create-todo-list.command';
import { TodoList } from '../../domain/entities/todo-list.entity';

describe('TodoListService', () => {
    let service: TodoListService;
    let mockTodoListRepository: Partial<TodoListRepository>;

    beforeEach(async () => {
        mockTodoListRepository = {
            createTodoList: jest.fn().mockResolvedValue(new TodoList('1', 'user1', 'My Todo List')),
            findTodoListsByUser: jest.fn().mockResolvedValue([
                new TodoList('1', 'user1', 'My Todo List'),
                new TodoList('2', 'user1', 'Another Todo List'),
            ]),
            updateTodoList: jest.fn().mockResolvedValue(new TodoList('1', 'user1', 'Updated Todo List')),
            deleteTodoList: jest.fn().mockResolvedValue(undefined),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodoListService,
                {
                    provide: 'TodoListRepository', // Fix the injection token here
                    useValue: mockTodoListRepository,
                },
            ],
        }).compile();

        service = module.get<TodoListService>(TodoListService);
    });

    it('should create a todo list', async () => {
        const createTodoListCommand = new CreateTodoListCommand('user1', 'My Todo List');
        const result = await service.createTodoList(createTodoListCommand.userId, createTodoListCommand.title);

        expect(mockTodoListRepository.createTodoList).toHaveBeenCalledWith(expect.any(Object));
        expect(result.title).toBe('My Todo List');
    });

    it('should fetch todo lists for a user', async () => {
        const userId = 'user1';
        const result = await service.getTodoListsByUser(userId);

        expect(mockTodoListRepository.findTodoListsByUser).toHaveBeenCalledWith(userId);
        expect(result.length).toBe(2);
        expect(result[0].title).toBe('My Todo List');
    });

    it('should update a todo list', async () => {
        const updateData = { title: 'Updated Todo List' };
        const result = await service.updateTodoList('1', updateData);

        expect(mockTodoListRepository.updateTodoList).toHaveBeenCalledWith('1', updateData);
        expect(result.title).toBe('Updated Todo List');
    });

    it('should delete a todo list', async () => {
        await service.deleteTodoList('1');

        expect(mockTodoListRepository.deleteTodoList).toHaveBeenCalledWith('1');
    });
});
