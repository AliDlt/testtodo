import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodoListDto {
    @ApiProperty({
        description: 'The ID of the user who owns the Todo List',
        example: '607f191e810c19729de860ea',
    })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'The title of the Todo List',
        example: 'Daily Tasks',
    })
    @IsString()
    @IsNotEmpty()
    title: string;
}
