import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddTodoItemDto {
    @ApiProperty({
        description: 'The title of the new Todo Item',
        example: 'Finish project report',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'The description for the new Todo Item',
        example: 'Complete the final report for the Q3 project',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The priority of the Todo Item',
        example: 1,
    })
    @IsNumber()
    @Min(1)
    priority: number;
}
