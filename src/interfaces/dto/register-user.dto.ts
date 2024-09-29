import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty({
        description: 'The username of the new user',
        example: 'john_doe'
    })
    username: string;

    @ApiProperty({
        description: 'The password for the new user',
        example: 'strongPassword123',
        minLength: 6
    })
    password: string;
}
