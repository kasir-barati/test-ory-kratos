import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import oryConfig from './ory.config';
import { OryService } from './ory.service';

@Module({
    imports: [ConfigModule.forFeature(oryConfig)],
    providers: [OryService],
    exports: [OryService],
})
export class OryModule {}
