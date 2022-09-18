import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { V0alpha2Api } from '@ory/kratos-client';

import kratosConfig from './kratos.config';
import { KratosService } from './kratos.service';

@Module({
    imports: [ConfigModule.forFeature(kratosConfig)],
    providers: [KratosService, V0alpha2Api],
    exports: [KratosService],
})
export class KratosModule {}
