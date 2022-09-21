import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { KratosModule } from '../kratos/kratos.module';

@Module({
    imports: [KratosModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
