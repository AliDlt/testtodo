import { ApiProperty } from '@nestjs/swagger';

export class AddTodoItemDto {
    @ApiProperty({
        description: 'The title of the new Todo Item',
        example: 'Finish project report'
    })
    title: string;

    @ApiProperty({
        description: 'The description for the new Todo Item',
        example: 'Complete the final report for the Q3 project'
    })
    description: string;

    @ApiProperty({
        description: 'The priority of the Todo Item',
        example: 1
    })
    priority: number;
}
