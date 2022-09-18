import { ValidationError } from 'class-validator';

export function logEnvValidationErrors(
    validatedConfigsErrors: ValidationError[],
) {
    console.dir({
        errors: validatedConfigsErrors.map((error) => ({
            value: error.value,
            property: error.property,
            message: Object.values(error.constraints!)[0],
        })),
        errorCode: 'required_environment_variables_loading_failed',
        message:
            'Application could not load required environment variables',
    });
}
