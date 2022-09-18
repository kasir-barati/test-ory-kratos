import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

import { OryConfigs } from './ory.type';
import { logEnvValidationErrors } from '@shared/helpers/log-env-validation-errors.helper';

export default registerAs('oryConfigs', (): OryConfigs => {
    const validatedEnvs = validate(process.env);

    return {
        accessToken: validatedEnvs.ACCESS_TOKEN,
        url: validatedEnvs.URL,
        kratosAdminEndpoint: validatedEnvs.KRATOS_ADMIN_ENDPOINT,
    };
});

class EnvironmentVariables {
    @IsString()
    URL: string;

    @IsString()
    ACCESS_TOKEN: string;

    @IsString()
    KRATOS_ADMIN_ENDPOINT: string;
}

function validate(config: Record<string, unknown>) {
    const validatedConfigs = plainToInstance(
        EnvironmentVariables,
        config,
        {
            enableImplicitConversion: true,
        },
    );
    const validatedConfigsErrors = validateSync(validatedConfigs);

    if (validatedConfigsErrors.length > 0) {
        logEnvValidationErrors(validatedConfigsErrors);
        throw new Error(validatedConfigsErrors.toString());
    }

    return validatedConfigs;
}
