import { ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import appConfig from './app/app.config';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfigs = app.get<ConfigType<typeof appConfig>>(
        appConfig.KEY,
    );
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix(`api/v${appConfigs.apiVersion}`);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: { enableImplicitConversion: false },
        }),
    );

    if (appConfigs.swagger) {
        const options = new DocumentBuilder()
            .setTitle(appConfigs.applicationName)
            .setDescription(
                `${appConfigs.applicationName} RESTfull API`,
            )
            .setVersion(String(appConfigs.apiVersion))
            .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            })
            .build();
        const doc = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup('doc', app, doc);
    }
    await app.listen(appConfigs.port);
}
bootstrap();
