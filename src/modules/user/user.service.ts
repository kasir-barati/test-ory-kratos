import { Injectable } from '@nestjs/common';
import { KratosService } from '../kratos/kratos.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private kratosService: KratosService) {}

    create(createUserDto: CreateUserDto) {
        const { email } = createUserDto;

        return this.kratosService.createIdentity(email);
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: string) {
        return this.kratosService.getIdentityById(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
