import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: "User's Email address",
        example: 'kasir.barati@gmail.com',
        maxLength: 320,
    })
    @IsEmail()
    email: string;
}
