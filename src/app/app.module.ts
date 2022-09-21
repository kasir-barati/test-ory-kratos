import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './app.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { OryModule } from '@src/modules/ory/ory.module';
import { KratosModule } from '@src/modules/kratos/kratos.module';
import { UserModule } from '@src/modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
            cache: true,
            load: [appConfig],
        }),
        OryModule,
        KratosModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
