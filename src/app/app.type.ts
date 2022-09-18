import { NodeEnv } from '@shared/types/node-env.type';

export interface AppConfigs {
    apiVersion: number;
    applicationName: string;
    nodeEnv: NodeEnv;
    host: string;
    swagger: boolean;
    port: number;
    baseUrl: string;
    databaseUrl: string;
}
