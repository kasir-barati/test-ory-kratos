import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

import { KratosConfigs } from './kratos.type';
import { logEnvValidationErrors } from '@shared/helpers/log-env-validation-errors.helper';

export default registerAs('kratosConfigs', (): KratosConfigs => {
    const validatedEnvs = validate(process.env);

    return {
        kratosAdminUrl: validatedEnvs.KRATOS_ADMIN_URL,
    };
});

class EnvironmentVariables {
    @IsString()
    KRATOS_ADMIN_URL: string;
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
