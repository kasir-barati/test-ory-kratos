import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { KratosService } from '@modules/kratos/kratos.service';
import { OryService } from '@src/modules/ory/ory.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
    constructor(
        private kratosService: KratosService,
        private oryService: OryService,
    ) {}

    async onApplicationBootstrap() {}

    async healthCheck() {
        return await this.kratosService.healthCheck();
    }
}
