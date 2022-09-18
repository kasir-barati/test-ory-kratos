import { AxiosInstance } from 'axios';
import { Configuration } from '@ory/kratos-client';

export interface KratosConfigs {
    kratosAdminUrl: string;
}

export interface KratosOptions {
    configuration: Omit<Configuration, 'isJsonMime'>;
    basePath?: string;
    axios?: AxiosInstance;
}
