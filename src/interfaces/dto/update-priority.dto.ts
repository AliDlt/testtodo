import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdatePriorityDto {
    @ApiProperty({
        description: 'The ID of the Todo Item to update',
        example: '607f191e810c19729de860ea',
    })
    @IsString()
    @IsNotEmpty()
    todoItemId: string;

    @ApiProperty({
        description: 'The new priority for the Todo Item',
        example: 2,
    })
    @IsNumber()
    @Min(1)
    priority: number;
}
