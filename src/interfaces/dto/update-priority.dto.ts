import { ApiProperty } from '@nestjs/swagger';

export class UpdatePriorityDto {
    @ApiProperty({
        description: 'The ID of the Todo Item to update',
        example: '607f191e810c19729de860ea'
    })
    todoItemId: string;

    @ApiProperty({
        description: 'The new priority for the Todo Item',
        example: 2
    })
    priority: number;
}
