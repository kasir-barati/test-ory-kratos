import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
    Configuration,
    Identity,
    MetadataApi,
    Session,
    V0alpha2Api,
} from '@ory/kratos-client';
import axios from 'axios';

import kratosConfig from './kratos.config';

@Injectable()
export class KratosService {
    private readonly EMAIL = 'email';
    private metadata: MetadataApi;

    constructor(
        @Inject(kratosConfig.KEY)
        private kratosConfigs: ConfigType<typeof kratosConfig>,
        private kratos: V0alpha2Api,
    ) {
        this.kratos = new V0alpha2Api(
            new Configuration({
                basePath: kratosConfigs.kratosAdminUrl,
            }),
            '',
            // @ts-ignore
            axios,
        );
        this.metadata = new MetadataApi(
            new Configuration({
                basePath: kratosConfigs.kratosAdminUrl,
            }),
            '',
            // @ts-ignore
            axios,
        );
    }

    public get metadataApi(): MetadataApi {
        if (!this.metadata) {
            throw new Error('Kratos metadata API not initialized');
        }

        return this.metadata;
    }

    /**
     * @description Get Server health. Basically a wrapper around kratos
     */
    async healthCheck(): Promise<string> {
        try {
            const rsp = await this.metadataApi.isAlive();
            return rsp.data.status;
        } catch (e) {
            if (e?.response?.data?.ui?.messages) {
                const messages: string[] = [];
                const codes: string[] = [];
                e.response.data.ui.messages.map((message) => {
                    messages.push(message.text);
                    codes.push(message.id);
                });

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new ApolloError(
                    messages,
                    codes,
                    e.response.data.ui.messages,
                );
            }
            throw e;
        }
    }

    async getIdentityById(id: string): Promise<Identity> {
        const response = await this.kratos.adminGetIdentity(id);

        return response.data;
    }

    async createIdentity(email: string): Promise<Identity> {
        try {
            const res = await this.kratos.adminCreateIdentity({
                schema_id: 'default',
                traits: {
                    email,
                },
            });

            return res.data;
        } catch (e) {
            throw e;
        }
    }
}
