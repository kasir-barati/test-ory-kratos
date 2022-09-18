import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
    Configuration,
    V0alpha2Api,
    V0alpha2ApiInterface,
} from '@ory/client';

import oryConfig from './ory.config';

@Injectable()
export class OryService {
    private readonly adminEndpoint: string;
    public readonly ory: V0alpha2ApiInterface;

    constructor(
        @Inject(oryConfig.KEY)
        private oryConfigs: ConfigType<typeof oryConfig>,
    ) {
        this.adminEndpoint = this.oryConfigs.kratosAdminEndpoint;
        this.ory = new V0alpha2Api(
            new Configuration({
                basePath: this.oryConfigs.url,
                accessToken: this.oryConfigs.accessToken,
                baseOptions: {
                    // Ensures that cookies are included in CORS requests:
                    withCredentials: true,
                },
            }),
        );
    }
}
