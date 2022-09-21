import { IsEmail, IsOptional } from 'class-validator';

export class FilterUsers {
    @IsEmail({}, { each: true })
    @IsOptional()
    emails?: string[];
}
